'use client';
import { useEffect, useState } from 'react';
import { IconButton } from '@once-ui-system/core';
import { ShineBorder } from '@/components/ShineBorder';


type ScrollStep = 0 | 1 | 2;

export function ScrollButton() {
  const [step, setStep] = useState<ScrollStep>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const update = () => {
      const selectedWork = document.getElementById('selected-work');
      const latestPosts = document.getElementById('latest-posts');
    
      if (!selectedWork || !latestPosts) return;
    
      const y = window.scrollY;
  const atBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 50;
  const selectedWorkTop = selectedWork.getBoundingClientRect().top + window.scrollY - 200;
  const latestPostsTop = latestPosts.getBoundingClientRect().top + window.scrollY - 200;

  if (atBottom || y >= latestPostsTop) {
    setStep(2);
  } else if (y >= selectedWorkTop) {
    setStep(1);
  } else {
    setStep(0);
  }
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const handleClick = () => {
    const selectedWork = document.getElementById('selected-work');
    const latestPosts = document.getElementById('latest-posts');

    if (step === 0) {
      selectedWork?.scrollIntoView({ behavior: 'smooth' });
    } else if (step === 1) {
      latestPosts?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const icon =
    step === 2 ? 'chevronUp' : 'chevronDown';

  if (!mounted) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 100,
        borderRadius: 'var(--radius-full)',
        width: 'var(--static-space-40)',
        height: 'var(--static-space-40)',
      }}
    >
      {/*<ShineBorder
        shineColor={['#5ba3c9', '#ffffff', '#5ba3c9']}
        duration={6}
        borderWidth={0.6}
      />*/}
      <IconButton
        onClick={handleClick}
        data-border="rounded"
        variant="tertiary"
        icon={icon}
        size="s"
        style={{
          height: 'var(--static-space-40)',
          width: 'var(--static-space-40)',
          minHeight: 'unset',
          minWidth: 'unset',
          border: 'none',        // ← add this
          outline: 'none', 
        }}
      />
    </div>
  );
}