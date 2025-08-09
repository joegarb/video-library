import VideoGallery from '../components/VideoGallery/VideoGallery';

export default function Videos() {
  return (
    <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6">
      <h1 className="text-2xl font-semibold mb-4">Videos</h1>
      <VideoGallery />
    </div>
  );
}
