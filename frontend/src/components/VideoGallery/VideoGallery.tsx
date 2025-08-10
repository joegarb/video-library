import { Spinner } from '@heroui/react';
import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchVideos } from '../../api/videos';
import VideoGalleryControls from './VideoGalleryControls';
import VirtualizedVideoGrid from './VirtualizedVideoGrid';

type SortOption = 'created_at_desc' | 'created_at_asc';

const PAGE_SIZE = 24;

export default function VideoGallery() {
  const [sortOrder, setSortOrder] = useState<SortOption>('created_at_desc');

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['videos', { sort: sortOrder }],
    queryFn: ({ pageParam }) =>
      fetchVideos({
        sort: sortOrder,
        limit: PAGE_SIZE,
        after: pageParam,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return lastPage[lastPage.length - 1]?.created_at.toISOString();
    },
  });

  const allVideos = data?.pages.flat() ?? [];

  return (
    <div className="flex flex-col gap-4">
      <VideoGalleryControls sortOrder={sortOrder} onSortChange={setSortOrder} />

      {isLoading ? (
        <div className="flex w-full justify-center py-10">
          <Spinner label="Loading videos..." />
        </div>
      ) : isError ? (
        <div className="text-danger">
          {error instanceof Error ? error.message : 'Failed to load videos'}
        </div>
      ) : (
        <VirtualizedVideoGrid
          videos={allVideos}
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </div>
  );
}
