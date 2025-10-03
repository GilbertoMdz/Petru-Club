// src/components/Pet3D.tsx
import { motion as Motion } from 'framer-motion';
import React, { useState } from 'react';

const placeholder =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="640" height="480">
    <defs>
      <linearGradient id="g" x1="0" x2="1">
        <stop offset="0%" stop-color="#9fd3e0"/>
        <stop offset="100%" stop-color="#0f6a82"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
  </svg>`);

interface Pet3DProps {
  src?: string | null;
  alt?: string;
  wrapperClass?: string;
  imgClass?: string;
}

const Pet3D: React.FC<Pet3DProps> = ({
  src,
  alt = 'Mascota 3D',
  wrapperClass = 'mx-auto w-full max-w-sm',
  imgClass = 'aspect-[4/3] w-full rounded-2xl border border-slate-200 object-cover shadow-sm',
}) => {
  const [failed, setFailed] = useState(false);
  const finalSrc = failed || !src ? placeholder : src;

  return (
    <Motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={wrapperClass}>
      <img
        src={finalSrc}
        alt={alt}
        onError={() => setFailed(true)}
        className={imgClass}
        loading="eager"
      />
    </Motion.div>
  );
};

export default Pet3D;
