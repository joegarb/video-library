import { z } from 'zod';
import { type Video, VideoSchema } from 'video-library-common';

const API_BASE_URL = 'http://localhost:3000';

export type GetVideosParams = {
  sort?: 'created_at_desc' | 'created_at_asc';
  limit?: number;
  after?: string;
};

const VideosApiSchema = z.array(VideoSchema);

export async function fetchVideos(
  params: GetVideosParams = {},
): Promise<Video[]> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

  const url = new URL('/videos', baseUrl);
  if (params.sort) url.searchParams.set('sort', params.sort);
  if (params.limit != null) url.searchParams.set('limit', String(params.limit));
  if (params.after) url.searchParams.set('after', params.after);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to load videos (${response.status})`);
  }
  const data = (await response.json()) as unknown;

  return VideosApiSchema.parse(data);
}

export async function createVideo(data: {
  title: string;
  tags?: string[];
}): Promise<Video> {
  const response = await fetch(`${API_BASE_URL}/videos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to create video: ${response.statusText}`);
  }

  return response.json();
}
