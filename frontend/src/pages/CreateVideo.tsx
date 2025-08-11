import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Chip, Alert } from '@heroui/react';
import { createVideo } from '../api/videos';

export default function CreateVideo() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    setError(null);
    try {
      await createVideo({
        title: title.trim(),
        tags: tags.length > 0 ? tags : undefined,
      });
      navigate('/videos');
    } catch (error) {
      console.error('Failed to create video:', error);
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to create video. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Video</h1>

      {error && (
        <Alert variant="flat" color="danger" className="mb-6">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title *
          </label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter video title"
            isRequired
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium mb-2">
            Tags
          </label>
          <div className="flex gap-2 mb-2">
            <Input
              id="tags"
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag"
              onKeyPress={(e) =>
                e.key === 'Enter' && (e.preventDefault(), handleAddTag())
              }
              className="flex-1"
            />
            <Button
              type="button"
              size="sm"
              variant="flat"
              onPress={handleAddTag}
              isDisabled={!newTag.trim()}
            >
              Add
            </Button>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  variant="flat"
                  color="primary"
                  onClose={() => handleRemoveTag(tag)}
                >
                  {tag}
                </Chip>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <Button
            type="submit"
            color="primary"
            isLoading={isSubmitting}
            isDisabled={!title.trim()}
          >
            Create Video
          </Button>
          <Button
            type="button"
            variant="flat"
            onPress={() => navigate('/videos')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
