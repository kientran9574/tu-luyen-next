import { menuItem } from "@/constants";
import { TMenuItem } from "@/types";
import ActiveLink from "../common/ActiveLink";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../common/ModeToggle";

const Sidebar = () => {
  return (
    <>
      <aside className="p-5 border-r border-r-gray-300  h-screen bg-white dark:bg-graySecondary dark:border-opacity-20 flex flex-col">
        <div className="logo font-bold text-3xl inline-flex mb-5">Ucademy</div>
        <ul className="p-2 flex flex-col gap-4">
          {menuItem.map((item, index) => (
            <MenuItem
              title={item.title}
              url={item.url}
              icons={item.icons}
              key={index + 1}
            ></MenuItem>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-end gap-3">
          <ModeToggle></ModeToggle>
          <UserButton></UserButton>
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
