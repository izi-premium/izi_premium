"use client";

import Image from "next/image";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useTranslations } from "next-intl";

interface UserAvatarProps {
  user: User;
  size?: "sm" | "md" | "lg";
}

export function UserAvatar({ user, size = "md" }: UserAvatarProps) {
  const tClose = useTranslations("Navigation");

  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = async () => {
    try {
      await signOut({
        callbackUrl: "/", // Redirect to homepage after logout
        redirect: true,
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`${sizeClasses[size]} hover:cusor-pointer flex items-center justify-center overflow-hidden rounded-full border-2 border-gray-300 bg-gray-200 transition-all duration-200 hover:border-gray-400 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none`}
        >
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "User avatar"}
              width={size === "sm" ? 32 : size === "md" ? 40 : 48}
              height={size === "sm" ? 32 : size === "md" ? 40 : 48}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="font-semibold text-gray-600">
              {user.name ? getInitials(user.name) : "U"}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-fit rounded-sm bg-white p-3"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="paragraph-14-normal leading-none font-medium">
              {user.name || "User"}
            </p>
            <p className="text-muted-foreground paragraph-14-normal leading-none">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="paragraph-14-normal cursor-pointer text-red-600 hover:underline focus:text-red-600"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4 lg:size-6" />
          <span className="paragraph-14-normal">{tClose("logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
