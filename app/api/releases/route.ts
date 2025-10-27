import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      'https://api.github.com/repos/Luckyyaduvanshiofficial/Codai/releases/latest',
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch releases');
    }

    const data = await response.json();

    return NextResponse.json({
      version: data.tag_name,
      name: data.name,
      published_at: data.published_at,
      body: data.body,
      assets: data.assets.map((asset: any) => ({
        name: asset.name,
        size: asset.size,
        download_url: asset.browser_download_url,
        download_count: asset.download_count,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch releases' },
      { status: 500 }
    );
  }
}
