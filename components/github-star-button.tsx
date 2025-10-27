'use client';

import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function GitHubStarButton() {
  const [stars, setStars] = useState<number | null>(null);
  const repoUrl = 'https://github.com/Luckyyaduvanshiofficial/Codai';

  useEffect(() => {
    // Fetch GitHub stars
    fetch('https://api.github.com/repos/Luckyyaduvanshiofficial/Codai')
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count) {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {
        // Fallback if API fails
        setStars(null);
      });
  }, []);

  return (
    <a href={repoUrl} target="_blank" rel="noopener noreferrer">
      <Button 
        variant="outline" 
        size="sm"
        className="gap-1.5 font-medium"
      >
        <Star className="w-4 h-4" />
        <span>Star</span>
        {stars !== null && (
          <span className="ml-1 px-1.5 py-0.5 bg-[#0969da]/10 dark:bg-[#4493f8]/10 text-[#0969da] dark:text-[#4493f8] rounded text-xs font-semibold">
            {stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars}
          </span>
        )}
      </Button>
    </a>
  );
}
