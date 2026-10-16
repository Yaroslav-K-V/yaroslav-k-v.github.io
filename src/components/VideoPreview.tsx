import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface VideoPreviewProps {
  src: string;
  poster?: string;
  alt: string;
  className?: string;
}

/**
 * Autoplays muted on desktop; on small screens shows the poster
 * with a tap-to-play overlay to save mobile data.
 */
export const VideoPreview: React.FC<VideoPreviewProps> = ({
  src,
  poster,
  alt,
  className = 'w-full max-h-80 object-contain bg-[#101010]'
}) => {
  const [tapped, setTapped] = useState(false);
  const [stillMode] = useState<boolean>(
    () =>
      typeof window !== 'undefined' &&
      (window.matchMedia('(max-width: 640px)').matches ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  );

  if (!tapped && stillMode) {
    return (
      <div className="overflow-hidden rounded-[3px] border border-[#3d3a39]">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setTapped(true);
          }}
          className="relative block w-full aspect-video cursor-pointer"
          aria-label={`Play ${alt}`}
        >
        {poster ? (
          <img src={poster} alt={alt} loading="lazy" className={className} />
        ) : (
          <span className={`block ${className}`} />
        )}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="p-3 rounded-[3px] bg-[#101010]/80 border border-[#3d3a39]">
            <Play className="w-6 h-6 text-[#eeeeee]" />
          </span>
        </span>
      </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[3px] border border-[#3d3a39]">
    <video
      src={src}
      poster={poster}
      autoPlay={!stillMode}
      muted
      loop
      playsInline
      preload="metadata"
      controls={tapped}
      className={className}
    />
    </div>
  );
};
