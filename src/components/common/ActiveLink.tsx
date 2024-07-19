"use client";
import { TActiveLinkProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ActiveLink = ({ url, children }: TActiveLinkProps) => {
  const pathname = usePathname();
  const isActive = url === pathname;
  return (
    <>
      <li>
        <Link
          href={url}
          className={`flex items-center gap-4 p-3 font-semibold text-lg rounded-md dark:text-gray-50 dark:font-medium dark:text-opacity-45 transition-all ${
            isActive ? "bg-primary dark:bg-opacity-80 dark:bg-primary dark:font-extrabold" : "hover:!bg-primary hover:!bg-opacity-40"
          }`}
        >
          {children}
        </Link>
      </li>
    </>
  );
};

export default ActiveLink;
