import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/data/site';

export default function Logo({ className = '', priority = false }) {
  return (
    <Link href="/" className={className} aria-label={`${site.name} — home`}>
      <Image src="/images/brand/logo.png" alt={site.name} width={147} height={59} priority={priority} style={{ height: 'auto' }} />
    </Link>
  );
}
