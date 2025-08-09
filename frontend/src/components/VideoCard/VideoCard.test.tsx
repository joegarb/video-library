import { render, screen } from '@testing-library/react';
import VideoCard from './VideoCard';

describe('VideoCard', () => {
  it('renders title, date, and tags', () => {
    render(
      <VideoCard
        title="Sample"
        thumbnailUrl="https://example.com/x.jpg"
        createdAt={new Date('2025-02-01T00:00:00Z')}
        tags={['alpha', 'beta']}
      />,
    );

    expect(screen.getByText('Sample')).toBeInTheDocument();
    expect(screen.getByText(/2025/)).toBeInTheDocument();
    expect(screen.getByText('alpha')).toBeInTheDocument();
    expect(screen.getByText('beta')).toBeInTheDocument();
  });
});
