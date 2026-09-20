import Link from "next/link";
import Image from "next/image";
import { logo } from '@/lib/images'

export default function Logo() {
  return (
    <Link href="/" className="inline-flex shrink-0" aria-label="ForgeBase">
      <Image src={logo} alt="ForgeBase Logo" width={38} height={38} />
    </Link>
  );
}
