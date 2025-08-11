import { z } from 'zod';

export const VideoSchema = z.object({
  id: z.string(),
  title: z.string(),
  thumbnail_url: z.url(),
  created_at: z.iso.datetime(),
  duration: z.number().int().min(0),
  views: z.number().int().min(0),
  tags: z.array(z.string()),
});

export type Video = z.infer<typeof VideoSchema>;

export const VideoQuerySchema = z.object({
  sort: z
    .enum(['created_at_asc', 'created_at_desc'])
    .optional()
    .default('created_at_desc'),
  limit: z.coerce.number().int().min(1).max(100).optional().default(100),
  after: z.string().optional(),
});

export type VideoQuery = z.infer<typeof VideoQuerySchema>;

export const CreateVideoSchema = z.object({
  title: z.string().min(1),
  tags: z.array(z.string()).optional(),
});

export type CreateVideo = z.infer<typeof CreateVideoSchema>;
