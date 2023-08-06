"use client"
import MenuButton from "@/utils/MenuButton";
import NavbarNavig from "@/utils/NavbarNavig";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession()
  const [isBlur, setIsBlur] = useState(false);

  const handleScroll = () => {
    if (window.scrollY === 0) {
      setIsBlur(false);
    } else {
      setIsBlur(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav onScroll={handleScroll} className={`w-full py-3 flex items-center justify-evenly fixed top-0 z-[999] ${isBlur ? 'bg-white duration-500' : 'backdrop-blur-2xl bg-white/50'}`}>
      <div className="flex gap-4">
        <Link href='/' className="font-bold text-xl">Parabotan</Link>
      </div>
      <MenuButton image={session?.user?.image as string || ''} status={status} />
      <NavbarNavig image={session?.user?.image as string || ''} status={status} />

    </nav>
  )
}
