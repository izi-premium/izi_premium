"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/firebase-auth";
import { User } from "firebase/auth";
import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface UserAvatarProps {
  user: User;
  size?: "sm" | "md" | "lg";
}

export function UserAvatar({ user, size = "md" }: UserAvatarProps) {
  const tClose = useTranslations("Navigation");
  const tSubscription = useTranslations("Subscription");

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
      await logout();
      window.location.href = "/";
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
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              alt={user.displayName || "User avatar"}
              width={size === "sm" ? 32 : size === "md" ? 40 : 48}
              height={size === "sm" ? 32 : size === "md" ? 40 : 48}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="font-semibold text-gray-600">
              {user.displayName ? getInitials(user.displayName) : "U"}
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
              {user.displayName || "User"}
            </p>
            <p className="text-muted-foreground paragraph-14-normal leading-none">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="paragraph-14-normal cursor-pointer hover:underline"
        >
          <Link href="/settings/subscription" className="flex items-center">
            <Settings className="mr-2 h-4 w-4 lg:size-6" />
            <span className="paragraph-14-normal">
              {tSubscription("manageSubscription")}
            </span>
          </Link>
        </DropdownMenuItem>
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
