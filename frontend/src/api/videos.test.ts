import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchVideos } from './videos';

const BASE_URL = 'http://localhost:3000';

describe('fetchVideos', () => {
  const originalEnv = { ...import.meta.env };
  const mockFetch = vi.fn();

  beforeEach(() => {
    global.fetch = mockFetch;
    (import.meta.env as Record<string, string | boolean>) = {
      ...originalEnv,
      VITE_API_BASE_URL: BASE_URL,
    };
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('builds URL with expected params and successfully parses response', async () => {
    const mockResponse = [
      {
        id: '1',
        title: 'Test Video',
        thumbnail_url: 'https://example.com/1.jpg',
        created_at: '2025-01-01T00:00:00.000Z',
        duration: 10,
        views: 1,
        tags: ['test'],
      },
    ];

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchVideos({
      sort: 'created_at_desc',
      limit: 24,
      after: '2025-01-01T00:00:00Z',
    });

    const calledWith = mockFetch.mock.calls[0][0] as string;
    expect(calledWith).toContain('http://localhost:3000/videos?');
    expect(calledWith).toContain('sort=created_at_desc');
    expect(calledWith).toContain('limit=24');
    expect(calledWith).toContain('after=2025-01-01T00%3A00%3A00Z');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
    expect(result[0].created_at).toBe('2025-01-01T00:00:00.000Z');
  });

  it('throws on non-ok response', async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 500 });
    await expect(fetchVideos()).rejects.toThrow('Failed to load videos');
  });

  it('throws on invalid payload', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ not: 'an array' }),
    });
    await expect(fetchVideos()).rejects.toThrow();
  });
});
