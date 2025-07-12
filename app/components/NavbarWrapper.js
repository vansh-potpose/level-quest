"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Authenticated from "./Authenticated";

export default function NavbarWrapper() {
  const pathname = usePathname();
  if (pathname === "/login") return null;
  if (pathname === "/registration") return null;
  return <Navbar />;
}
