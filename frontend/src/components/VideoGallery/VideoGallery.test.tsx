import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import VideoGallery from './VideoGallery';

function renderWithQuery(ui: React.ReactNode) {
  const qc = new QueryClient();
  return render(<QueryClientProvider client={qc}>{ui}</QueryClientProvider>);
}

describe('VideoGallery', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    global.fetch = mockFetch;
  });

  it('shows loading, then renders fetched items', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [
        {
          id: '1',
          title: 'First',
          thumbnail_url: 'https://example.com/1.jpg',
          created_at: '2025-01-01T00:00:00Z',
          duration: 10,
          views: 1,
          tags: ['t'],
        },
      ],
    });

    renderWithQuery(<VideoGallery />);

    expect(screen.getByText(/Loading videos/i)).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText('First')).toBeInTheDocument());
  });
});
