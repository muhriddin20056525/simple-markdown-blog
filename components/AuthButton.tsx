"use client";

import { signOut, useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function AuthButton() {
  // For get user info
  const { data: session, status } = useSession();

  // Show Loading
  if (status === "loading") {
    return (
      <Button variant={"ghost"} disabled>
        Loading...
      </Button>
    );
  }

  // SHow Sign In Button
  if (!session) {
    return (
      <Button variant={"outline"} onClick={() => signIn("google")}>
        Sign In
      </Button>
    );
  }

  // Show User Button And Dropdown
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* User Avatar */}
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session?.user.image || ""} />
            <AvatarFallback>{session?.user.name?.slice(0, 1)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* User Name And Email */}
        <DropdownMenuItem className="flex flex-col items-start">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session?.user.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user.email}
            </p>
          </div>
        </DropdownMenuItem>

        {/* Logout Button */}
        <DropdownMenuItem
          onClick={() => signOut()}
          className="font-semibold text-muted-foreground"
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AuthButton;
