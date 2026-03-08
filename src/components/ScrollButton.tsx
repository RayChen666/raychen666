'use client';
import { useEffect, useState } from 'react';
import { IconButton } from '@once-ui-system/core';

export function ScrollButton() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const update = () => {
      const el = document.getElementById('selected-work');
      if (!el) return;
      setScrolled(window.scrollY >= el.offsetTop - 200);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const handleClick = () => {
    if (scrolled) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById('selected-work')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted) return null;

  return (
    <div style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 100 }}>
      <IconButton
        onClick={handleClick}  // ← onClick instead of href
        data-border="rounded"
        variant="secondary"
        icon={scrolled ? 'chevronUp' : 'chevronDown'}
        size="s"
        style={{ height: '40px', width: '40px', minHeight: 'unset' }}
      />
    </div>
  );
}