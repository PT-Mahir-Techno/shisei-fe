'use client';

import { ParallaxProvider } from 'react-scroll-parallax';

export function EffectProvider({ children }: { children: React.ReactNode }) {
  return <ParallaxProvider>{children}</ParallaxProvider>;
}