"use client";

import Link from "next/link";
import AuthButton from "./AuthButton";

function Navbar() {
  return (
    <nav className="flex items-center justify-between py-4 px-10 border-b">
      {/* Logo */}
      <Link href={"/"} className="text-2xl font-bold">
        <span className="text-red-600">Markdown</span> Blog
      </Link>

      {/* SignIn Button */}
      <AuthButton />
    </nav>
  );
}

export default Navbar;
