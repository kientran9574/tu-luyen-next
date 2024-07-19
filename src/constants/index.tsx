import IconComment from "@/components/icons/IconComment";
import IconCourse from "@/components/icons/IconCourse";
import IconOrder from "@/components/icons/IconOrder";
import IconPlay from "@/components/icons/IconPlay";
import IconStudy from "@/components/icons/IconStudy";
import IconUser from "@/components/icons/IconUser";
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
