"use client";
import { menuItem } from "@/constants";
import { TMenuItem } from "@/types";
import ActiveLink from "../common/ActiveLink";
import { UserButton, useAuth } from "@clerk/nextjs";
import { ModeToggle } from "../common/ModeToggle";
import Link from "next/link";
import IconUser from "../icons/IconUser";

const Sidebar = () => {
  const { userId } = useAuth();
  return (
    <>
      <aside className="hidden p-5 min-h-screen border-r bgDarkMode borderDarkMode lg:flex flex-col">
        <div className="logo font-bold text-3xl inline-flex mb-5">Ucademy</div>
        <ul className="p-2 flex flex-col gap-4">
          {menuItem.map((item, index) => (
            <MenuItem
              title={item.title}
              url={item.url}
              icons={item.icons}
              key={index}
            ></MenuItem>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-end gap-3">
          <ModeToggle></ModeToggle>
          {!userId ? (
            <Link
              href={"/sign-in"}
              className="flex items-center justify-end p-1 size-9 rounded-md bg-primary"
            >
              <IconUser></IconUser>{" "}
            </Link>
          ) : (
            <UserButton></UserButton>
          )}
        </div>
      </aside>
    </>
  );
};
function MenuItem({ title, url, icons }: TMenuItem) {
  return (
    <>
      <ActiveLink url={url}>
        {icons}
        {title}
      </ActiveLink>
    </>
  );
}
export default Sidebar;
