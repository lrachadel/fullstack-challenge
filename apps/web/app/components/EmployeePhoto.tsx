'use client';

import { useState, useEffect } from 'react';

const FALLBACK_PHOTO = '/404-photo.jpg';
const photoCache = new Map<string, string>();

interface EmployeePhotoProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  fallbackClassName?: string;
}

export default function EmployeePhoto({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackClassName,
}: EmployeePhotoProps) {
  const [photoSrc, setPhotoSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!src) {
      setPhotoSrc(FALLBACK_PHOTO);
      setIsLoading(false);
      return;
    }

    if (photoCache.has(src)) {
      setPhotoSrc(photoCache.get(src)!);
      setIsLoading(false);
      return;
    }

    const checkPhoto = async () => {
      try {
        const res = await fetch(src, { method: 'HEAD' });
        if (res.ok) {
          photoCache.set(src, src);
          setPhotoSrc(src);
        } else {
          photoCache.set(src, FALLBACK_PHOTO);
          setPhotoSrc(FALLBACK_PHOTO);
        }
      } catch {
        photoCache.set(src, FALLBACK_PHOTO);
        setPhotoSrc(FALLBACK_PHOTO);
      } finally {
        setIsLoading(false);
      }
    };

    checkPhoto();
  }, [src]);

  if (isLoading) {
    return (
      <div
        className={`${fallbackClassName || className} bg-gray-200 animate-pulse`}
      />
    );
  }

  if (!photoSrc) {
    return (
      <div
        className={`${fallbackClassName || className} bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-medium`}
      >
        {alt.charAt(0)}
      </div>
    );
  }

  return (
    <img
      src={photoSrc}
      alt={alt}
      className={className}
      onError={() => {
        photoCache.set(src || '', FALLBACK_PHOTO);
        setPhotoSrc(FALLBACK_PHOTO);
      }}
    />
  );
}
