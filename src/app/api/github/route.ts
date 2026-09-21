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

const username = socials.github.split('/').filter(Boolean).pop() || 'Shreeshavjain';

const initialQuery = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionYears
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

  try {
    // 1. Fetch contributionYears and the recent rolling calendar
    const res1 = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: initialQuery,
        variables: { username },
      }),
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });

    if (!res1.ok) {
      console.error('[GitHub API] Initial query HTTP error:', res1.status);
      return NextResponse.json(
        { weeks: null },
        { status: 500, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    const json1 = await res1.json();

    if (json1.errors?.length) {
      console.error('[GitHub API] Initial query GraphQL errors:', json1.errors);
      return NextResponse.json(
        { weeks: null },
        { status: 500, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    const collection = json1.data?.user?.contributionsCollection;
    const contributionYears: number[] = collection?.contributionYears ?? [];
    const recentWeeks: ContributionWeek[] =
      collection?.contributionCalendar?.weeks ?? [];

    const last52 = recentWeeks.slice(-52).map((week) =>
      week.contributionDays.map((day) => ({
        count: day.contributionCount,
        date: day.date,
      }))
    );

    if (!contributionYears.length) {
      return NextResponse.json(
        { weeks: last52, total: 0, breakdown: {} },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        }
      );
    }

    // 2. Dynamically query totalContributions for every year in contributionYears
    const now = new Date();
    const currentYear = now.getUTCFullYear();

    const yearFields = contributionYears
      .map((year) => {
        const from = `${year}-01-01T00:00:00Z`;
        const to =
          year === currentYear ? now.toISOString() : `${year}-12-31T23:59:59Z`;
        return `
          y_${year}: contributionsCollection(from: "${from}", to: "${to}") {
            contributionCalendar {
              totalContributions
            }
          }
        `;
      })
      .join('\n');

    const yearsQuery = `
      query($username: String!) {
        user(login: $username) {
          ${yearFields}
        }
      }
    `;

    const res2 = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: yearsQuery,
        variables: { username },
      }),
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });

    if (!res2.ok) {
      console.error('[GitHub API] Years query HTTP error:', res2.status);
      return NextResponse.json(
        { weeks: last52, total: null, breakdown: {} },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        }
      );
    }

    const json2 = await res2.json();

    let lifetimeTotal = 0;
    const breakdown: Record<number, number> = {};

    for (const year of contributionYears) {
      const yearCount =
        json2.data?.user?.[`y_${year}`]?.contributionCalendar
          ?.totalContributions ?? 0;
      breakdown[year] = yearCount;
      lifetimeTotal += yearCount;
    }

    return NextResponse.json(
      {
        weeks: last52,
        total: lifetimeTotal,
        breakdown,
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