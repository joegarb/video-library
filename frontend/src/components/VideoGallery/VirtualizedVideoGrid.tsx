import { Spinner } from '@heroui/react';
import { useRef, useCallback, useState, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { type Video } from 'video-library-common';
import VideoCard from '../VideoCard/VideoCard';

const GRID_COLUMNS = 4;
const CARD_HEIGHT = 320;
const ROW_GAP = 16;
const LOAD_MORE_THRESHOLD = CARD_HEIGHT * 2;

interface VirtualizedVideoGridProps {
  videos: Video[];
  onLoadMore: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export default function VirtualizedVideoGrid({
  videos,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: VirtualizedVideoGridProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(videos.length / GRID_COLUMNS),
    getScrollElement: () => document.documentElement,
    estimateSize: () => CARD_HEIGHT + ROW_GAP,
    overscan: 5,
  });

  const handleScroll = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - LOAD_MORE_THRESHOLD) {
      if (hasNextPage && !isFetchingNextPage && !isLoadingMore) {
        setIsLoadingMore(true);
        onLoadMore();
      }
    }
  }, [hasNextPage, isFetchingNextPage, isLoadingMore, onLoadMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (isFetchingNextPage && isLoadingMore) {
    setIsLoadingMore(false);
  }

  return (
    <div ref={parentRef} className="w-full">
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const startIndex = virtualRow.index * GRID_COLUMNS;
          const rowVideos = videos.slice(startIndex, startIndex + GRID_COLUMNS);

          return (
            <div
              key={virtualRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2 mb-4"
            >
              {rowVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  title={video.title}
                  thumbnailUrl={video.thumbnail_url}
                  createdAt={new Date(video.created_at)}
                  tags={video.tags}
                />
              ))}
            </div>
          );
        })}
      </div>
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Spinner size="sm" label="Loading more..." />
        </div>
      )}
    </div>
  );
}
