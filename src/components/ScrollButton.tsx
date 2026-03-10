'use client';
import { useEffect, useState } from 'react';
import { IconButton } from '@once-ui-system/core';
import { ShineBorder } from '@/components/ShineBorder';



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
    <div style={{ 
      position: 'fixed', 
      bottom: '30px', 
      right: '30px', 
      zIndex: 100,
      //borderRadius: '50%', 
      borderRadius: 'var(--radius-full)',
      width: 'var(--static-space-40)', 
      height: 'var(--static-space-40)',
      //overflow: 'hidden',
    }}>
      <ShineBorder
        shineColor={["#5ba3c9", "#ffffff", "#5ba3c9"]}
        duration={6}
        borderWidth={0.6}
      />
      <IconButton
        onClick={handleClick}  // ← onClick instead of href
        data-border="rounded"
        variant="tertiary"
        
        icon={scrolled ? 'chevronUp' : 'chevronDown'}
        size="s"
        style={{ height: 'var(--static-space-40)', 
          width: 'var(--static-space-40)', 
          minHeight: 'unset',
          minWidth: 'unset', }}
      />
    </div>
  );
}