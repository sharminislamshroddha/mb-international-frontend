import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  href?: string;
  priority?: boolean;
}

export default function Logo({
  width = 140,
  height = 45,
  className = "",
  href = "/",
  priority = false,
}: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="M&B International Home"
      className={className}
    >
      <Image
        src="/logo/logo-light.png"
        alt="M&B International"
        width={width}
        height={height}
        priority={priority}
      />
    </Link>
  );
}