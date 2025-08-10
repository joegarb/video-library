import { z } from 'zod';
import { type Video, VideoSchema } from 'video-library-common';

export type GetVideosParams = {
  sort?: 'created_at_desc' | 'created_at_asc';
  limit?: number;
  after?: string;
};

const VideoApiSchema = VideoSchema.extend({ created_at: z.coerce.date() });
const VideosApiSchema = z.array(VideoApiSchema);

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
