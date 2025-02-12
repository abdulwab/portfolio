'use client';
import Image from 'next/image';
import { useState } from 'react';

interface ImageWithFallbackProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  fallbackSrc: string;
  alt: string;
}

export default function ImageWithFallback({
  src,
  fallbackSrc,
  alt,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
} 