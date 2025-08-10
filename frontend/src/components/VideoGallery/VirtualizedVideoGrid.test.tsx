import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import VirtualizedVideoGrid from './VirtualizedVideoGrid';

vi.mock('@tanstack/react-virtual', () => ({
  useVirtualizer: () => ({
    getVirtualItems: () => [
      {
        index: 0,
        start: 0,
        size: 336,
        key: 0,
      },
    ],
    getTotalSize: () => 336,
  }),
}));

describe('VirtualizedVideoGrid', () => {
  const mockVideos = [
    {
      id: '1',
      title: 'Test Video 1',
      thumbnail_url: 'https://example.com/1.jpg',
      created_at: new Date('2025-01-01T00:00:00Z'),
      duration: 10,
      views: 1,
      tags: ['test'],
    },
    {
      id: '2',
      title: 'Test Video 2',
      thumbnail_url: 'https://example.com/2.jpg',
      created_at: new Date('2025-01-02T00:00:00Z'),
      duration: 20,
      views: 2,
      tags: ['demo'],
    },
  ];

  const mockOnLoadMore = vi.fn();

  beforeEach(() => {
    mockOnLoadMore.mockClear();
  });

  it('renders video cards', () => {
    render(
      <VirtualizedVideoGrid
        videos={mockVideos}
        onLoadMore={mockOnLoadMore}
        hasNextPage={false}
        isFetchingNextPage={false}
      />,
    );

    expect(screen.getByText('Test Video 1')).toBeInTheDocument();
    expect(screen.getByText('Test Video 2')).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('demo')).toBeInTheDocument();
  });

  it('shows loading spinner when fetching next page', () => {
    render(
      <VirtualizedVideoGrid
        videos={mockVideos}
        onLoadMore={mockOnLoadMore}
        hasNextPage={true}
        isFetchingNextPage={true}
      />,
    );

    expect(screen.getByText('Loading more...')).toBeInTheDocument();
  });
});
