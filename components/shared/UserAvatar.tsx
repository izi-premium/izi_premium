// components/shared/UserAvatar.tsx

"use client";

import Image from "next/image";
import { User } from "next-auth";

interface UserAvatarProps {
  user: User;
  size?: "sm" | "md" | "lg";
}

export function UserAvatar({ user, size = "md" }: UserAvatarProps) {
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

  return (
    <div
      className={`${sizeClasses[size]} flex items-center justify-center overflow-hidden rounded-full border-2 border-gray-300 bg-gray-200`}
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
    </div>
  );
}
