"use client";

import Link from "next/link";
import AuthButton from "./AuthButton";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";

function Navbar() {
  const { data: session } = useSession();

  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <nav className="flex items-center justify-between py-4 px-10 border-b">
      {/* Logo */}
      <Link href={"/"} className="text-2xl font-bold">
        <span className="text-red-600">Markdown</span> Blog
      </Link>

      <div className="flex items-center space-x-4">
        {/* Create Post Button */}
        {isAdmin && (
          <Link href="/posts/create" className="flex items-center">
            <Button>Create Post</Button>
          </Link>
        )}

        {/* SignIn Button */}
        <AuthButton />
      </div>
    </nav>
  );
}

export default Navbar;
