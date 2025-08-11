import {
  Select,
  SelectItem,
  Input,
  Button,
  DateRangePicker,
} from '@heroui/react';
import type { DateValue } from '@internationalized/date';
import { parseDate } from '@internationalized/date';
import type { RangeValue } from '@react-types/shared';

type SortOption = 'created_at_desc' | 'created_at_asc';

interface VideoGalleryControlsProps {
  sortOrder: SortOption;
  onSortChange: (sort: SortOption) => void;
  searchTerm: string;
  onSearchChange: (search: string) => void;
  dateFrom: string;
  onDateFromChange: (date: string) => void;
  dateTo: string;
  onDateToChange: (date: string) => void;
  onClearFilters: () => void;
}

export default function VideoGalleryControls({
  sortOrder,
  onSortChange,
  searchTerm,
  onSearchChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
  onClearFilters,
}: VideoGalleryControlsProps) {
  const handleDateRangeChange = (range: RangeValue<DateValue> | null) => {
    if (range) {
      onDateFromChange(range.start ? range.start.toString() : '');
      onDateToChange(range.end ? range.end.toString() : '');
    } else {
      onDateFromChange('');
      onDateToChange('');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Input
          type="text"
          placeholder="Search videos by title..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 max-w-md"
        />
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

      <div className="flex items-center gap-4">
        <DateRangePicker
          label="Filter by date range"
          className="w-80"
          value={
            dateFrom || dateTo
              ? ({
                  start:
                    dateFrom && dateFrom.trim()
                      ? (() => {
                          try {
                            return parseDate(dateFrom.split('T')[0]);
                          } catch {
                            return null;
                          }
                        })()
                      : null,
                  end:
                    dateTo && dateTo.trim()
                      ? (() => {
                          try {
                            return parseDate(dateTo.split('T')[0]);
                          } catch {
                            return null;
                          }
                        })()
                      : null,
                } as RangeValue<DateValue>)
              : null
          }
          onChange={handleDateRangeChange}
        />
        <Button
          size="sm"
          variant="flat"
          color="default"
          onPress={onClearFilters}
        >
          Clear filters
        </Button>
      </div>
    </div>
  );
}
