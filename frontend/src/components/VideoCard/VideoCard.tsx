import { Card, CardBody, CardFooter, Chip, Image } from '@heroui/react';

export type VideoCardProps = {
  title: string;
  thumbnailUrl: string;
  createdAt: Date;
  tags: string[];
};

export default function VideoCard({
  title,
  thumbnailUrl,
  createdAt,
  tags,
}: VideoCardProps) {
  const createdDate = new Date(createdAt);

  return (
    <Card shadow="sm" radius="md" className="overflow-hidden w-full h-80">
      <CardBody className="p-0 h-48">
        <Image
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover"
          radius="none"
        />
      </CardBody>
      <CardFooter className="flex flex-col items-start gap-2 p-3">
        <div className="space-y-1 w-full">
          <h3 className="text-base font-medium leading-tight line-clamp-2">
            {title}
          </h3>
          <p className="text-tiny text-foreground-500">
            {Number.isNaN(createdDate.getTime())
              ? 'Unknown date'
              : createdDate.toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5 w-full">
          {tags.map((tag) => (
            <Chip key={tag} size="sm" variant="flat" color="primary">
              {tag}
            </Chip>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
