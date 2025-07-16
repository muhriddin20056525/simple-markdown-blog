"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

function Navbar() {
  return (
    <nav className="flex items-center justify-between py-4 px-10 border-b">
      <Link href={"/"} className="text-2xl font-bold">
        <span className="text-red-600">Markdown</span> Blog
      </Link>

      <Button variant={"outline"} onClick={() => signIn("google")}>
        Sign In
      </Button>
    </nav>
  );
}

export default Navbar;
