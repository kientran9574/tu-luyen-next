import IconComment from "@/components/icons/IconComment";
import IconCourse from "@/components/icons/IconCourse";
import IconOrder from "@/components/icons/IconOrder";
import IconPlay from "@/components/icons/IconPlay";
import IconStudy from "@/components/icons/IconStudy";
import IconUser from "@/components/icons/IconUser";
import { ECourseLevel, ECourseStatus } from "@/types/enum";
import React from "react";

export const menuItem: {
  title: string;
  url: string;
  icons: React.ReactNode;
}[] = [
  {
    title: "Khám phá",
    url: "/",
    icons: <IconPlay className="size-5"></IconPlay>,
  },
  {
    title: "Khu vực học tập",
    url: "/study",
    icons: <IconStudy className="size-5"></IconStudy>,
  },
  {
    title: "Quản lý khóa học",
    url: "/manage/course",
    icons: <IconCourse className="size-5"></IconCourse>,
  },
  {
    title: "Quản lý thành viên",
    url: "/manage/user",
    icons: <IconUser className="size-5"></IconUser>,
  },
  {
    title: "Quản lý đơn hàng",
    url: "/manage/order",
    icons: <IconOrder className="size-5"></IconOrder>,
  },
  {
    title: "Quản lý bình luận",
    url: "/manage/comment",
    icons: <IconComment className="size-5"></IconComment>,
  },
];

export const courseStatus: {
  title: string;
  value: ECourseStatus;
  className?: string;
}[] = [
  {
    title: "Đã duyệt",
    value: ECourseStatus.APPROVED,
    className: "text-green-500 bg-green-500",
  },
  {
    title: "Chờ duyệt",
    value: ECourseStatus.PENDING,
    className: "text-orange-500 bg-orange-500",
  },
  {
    title: "Từ chối",
    value: ECourseStatus.REJECTED,
    className: "text-red-500 bg-red-500",
  },
];
export const courseLevel: {
  title: string;
  value: ECourseLevel;
}[] = [
  {
    title: "Khó",
    value: ECourseLevel.ADVANCED,
  },
  {
    title: "Dễ",
    value: ECourseLevel.BEGINNER,
  },
  {
    title: "Trung bình ",
    value: ECourseLevel.INTERMEDIATE,
  },
];
export const commonClassNames = {
  status:
    "bg-opacity-10 border border-current rounded-md font-medium px-3 py-1 text-sm",
  action:
    "size-8 rounded-md border flex items-center justify-center p-2  text-gray-500 hover:border-opacity-80 dark:bg-transparent borderDarkMode dark:hover:border-opacity-20",
};
