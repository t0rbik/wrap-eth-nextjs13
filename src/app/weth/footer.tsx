'use client';

import { GitHubLogoIcon } from '@radix-ui/react-icons/';

export default function Footer() {
  return (
    <footer className="flex h-12 items-center justify-start pl-2">
      <a target="_blank" rel="noreferrer noopener" href="https://github.com/t0rbik/wrap-eth-nextjs13">
        <GitHubLogoIcon />
      </a>
    </footer>
  );
}
