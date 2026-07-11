import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src="/logo/logo.png"
        alt="M&B International"
        width={150}
        height={60}
        priority
      />
    </Link>
  );
}