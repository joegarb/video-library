import { Select, SelectItem, Spinner } from '@heroui/react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchVideos } from '../../api/videos';
import { type Video } from 'veed-library-common';
import VideoCard from '../VideoCard/VideoCard';

type SortOption = 'created_at_desc' | 'created_at_asc';

export default function VideoGallery() {
  const [sortOrder, setSortOrder] = useState<SortOption>('created_at_desc');

  const { data, isLoading, isError, error } = useQuery<Video[]>({
    queryKey: ['videos', { sort: sortOrder }],
    queryFn: () => fetchVideos({ sort: sortOrder, limit: 24 }),
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <Select
          aria-label="Sort by date"
          label="Sort by"
          size="sm"
          className="w-48"
          selectedKeys={new Set([sortOrder])}
          onSelectionChange={(keys) => {
            const selection = Array.from(keys as Set<string>)[0];
            if (selection) setSortOrder(selection as SortOption);
          }}
        >
          <SelectItem key="created_at_desc">Newest</SelectItem>
          <SelectItem key="created_at_asc">Oldest</SelectItem>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex w-full justify-center py-10">
          <Spinner label="Loading videos..." />
        </div>
      ) : isError ? (
        <div className="text-danger">
          {error instanceof Error ? error.message : 'Failed to load videos'}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {(data ?? []).map((video: Video) => (
            <VideoCard
              key={video.id}
              title={video.title}
              thumbnailUrl={video.thumbnail_url}
              createdAt={video.created_at}
              tags={video.tags}
            />
          ))}
        </div>
      )}
    </div>
  );
}
