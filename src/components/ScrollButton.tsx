'use client';
import { useEffect, useState } from 'react';
import { IconButton } from '@once-ui-system/core';

export function ScrollButton() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);  // ← add this

  useEffect(() => {
    setMounted(true);  // ← confirm we're on client

    const update = () => {
      const el = document.getElementById('selected-work');
      if (!el) return;
      
      const reached = window.scrollY >= el.offsetTop - 200;
      setScrolled(reached);
      history.replaceState(null, '', reached ? '/#selected-work' : '/');
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  if (!mounted) return null;  // ← don't render on server

  return (
    <div style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 100 }}>
      <IconButton
        href={scrolled ? '/' : '/#selected-work'}
        data-border="rounded"
        variant="secondary"
        icon={scrolled ? 'chevronUp' : 'chevronDown'}
        size="s"
        style={{ height: '40px', width: '40px', minHeight: 'unset' }}
      />
    </div>
  );
}