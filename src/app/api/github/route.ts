import { NextResponse } from 'next/server';
import { socials } from '@/data/siteConfig';

interface ContributionDay {
  contributionCount: number;
  date: string;
  weekday: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GitHubGraphQLResponse {
  data?: {
    user?: {
      recent?: {
        contributionCalendar: {
          weeks: ContributionWeek[];
        };
      };
      currentYear?: {
        contributionCalendar: {
          totalContributions: number;
        };
      };
      previousYear?: {
        contributionCalendar: {
          totalContributions: number;
        };
      };
    };
  };
  errors?: { message: string }[];
}

const username = socials.github.split('/').filter(Boolean).pop() || 'Shreeshavjain';

const query = `
  query(
    $username: String!
    $thisYearFrom: DateTime!
    $thisYearTo: DateTime!
    $prevYearFrom: DateTime!
    $prevYearTo: DateTime!
  ) {
    user(login: $username) {
      recent: contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              contributionCount
              date
              weekday
            }
          }
        }
      }
      currentYear: contributionsCollection(from: $thisYearFrom, to: $thisYearTo) {
        contributionCalendar {
          totalContributions
        }
      }
      previousYear: contributionsCollection(from: $prevYearFrom, to: $prevYearTo) {
        contributionCalendar {
          totalContributions
        }
      }
    }
  }
`;

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json(
      { weeks: null, error: 'No token configured' },
      { status: 401 }
    );
  }

  const now = new Date();
  const currentYear = now.getUTCFullYear();
  const previousYear = currentYear - 1;

  const thisYearFrom = `${currentYear}-01-01T00:00:00Z`;
  const thisYearTo = now.toISOString();
  const prevYearFrom = `${previousYear}-01-01T00:00:00Z`;
  const prevYearTo = `${previousYear}-12-31T23:59:59Z`;

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          username,
          thisYearFrom,
          thisYearTo,
          prevYearFrom,
          prevYearTo,
        },
      }),
      // Cache for 1 hour on Vercel edge
      next: { revalidate: 3600 },
      // Fail fast — don't hang for more than 5s
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      console.error('[GitHub API] HTTP error:', res.status);
      return NextResponse.json(
        { weeks: null },
        { status: 500, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    const json: GitHubGraphQLResponse = await res.json();

    if (json.errors?.length) {
      console.error('[GitHub API] GraphQL errors:', json.errors);
      return NextResponse.json(
        { weeks: null },
        { status: 500, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    const recentWeeks =
      json.data?.user?.recent?.contributionCalendar?.weeks ?? [];
    const currentYearTotal =
      json.data?.user?.currentYear?.contributionCalendar?.totalContributions ?? 0;
    const previousYearTotal =
      json.data?.user?.previousYear?.contributionCalendar?.totalContributions ?? 0;
    const combinedTotal = currentYearTotal + previousYearTotal;

    const last52 = recentWeeks.slice(-52).map((week) =>
      week.contributionDays.map((day) => ({
        count: day.contributionCount,
        date: day.date,
      }))
    );

    return NextResponse.json(
      {
        weeks: last52,
        total: combinedTotal,
        breakdown: {
          currentYear: currentYearTotal,
          previousYear: previousYearTotal,
        },
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (err) {
    // AbortError = timeout, log accordingly
    if (err instanceof Error && err.name === 'AbortError') {
      console.error('[GitHub API] Timed out after 5s');
    } else {
      console.error('[GitHub API] Exception:', err);
    }
    return NextResponse.json(
      { weeks: null },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}