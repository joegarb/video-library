import { Button } from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import VideoGallery from '../components/VideoGallery/VideoGallery';

export default function Videos() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Videos</h1>
        <Button color="primary" onPress={() => navigate('/create-video')}>
          Create Video
        </Button>
      </div>
      <VideoGallery />
    </div>
  );
}
