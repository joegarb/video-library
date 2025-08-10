import { Select, SelectItem } from '@heroui/react';

type SortOption = 'created_at_desc' | 'created_at_asc';

interface VideoGalleryControlsProps {
  sortOrder: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export default function VideoGalleryControls({
  sortOrder,
  onSortChange,
}: VideoGalleryControlsProps) {
  return (
    <div className="flex items-center justify-end">
      <Select
        aria-label="Sort by date"
        label="Sort by"
        size="sm"
        className="w-48"
        selectedKeys={new Set([sortOrder])}
        onSelectionChange={(keys) => {
          const first = Array.from(keys as Set<string>)[0];
          if (first) onSortChange(first as SortOption);
        }}
      >
        <SelectItem key="created_at_desc">Most recent</SelectItem>
        <SelectItem key="created_at_asc">Oldest</SelectItem>
      </Select>
    </div>
  );
}
