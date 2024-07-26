"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Heading from "../common/Heading";
import Image from "next/image";
import { commonClassNames, courseStatus } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import IconEdit from "../icons/IconEdit";
import IconStudy from "../icons/IconStudy";
import IconDelete from "../icons/IconDelete";
import IconEye from "../icons/IconEye";
import { ICourse } from "@/database/course.model";
import Swal from "sweetalert2";
import { updateCourse } from "@/lib/actions/course.actions";
import { ECourseStatus } from "@/types/enum";
import { toast } from "react-toastify";
const CourseManage = ({ data }: { data: ICourse[] }) => {
  return (
    <>
      <Heading className="mb-10">Quản Lý Khóa học</Heading>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Thông tin</TableHead>
            <TableHead>Gía</TableHead>
            <TableHead>Trạng thái </TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 &&
            data.map((item) => {
              const courseStatusItem = courseStatus.find(
                (itemStatus) => itemStatus.value === item.status
              );
              const handleDeleteCourse =  (slug: string) => {
                try {
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      await updateCourse({
                        slug,
                        updateCourse: {
                          status: ECourseStatus.PENDING,
                          _destroy: true,
                        },
                        path: "/manage/course",
                      });
                      toast.success("Xóa khóa học thành công!");
                    }
                  });
                } catch (error) {
                  console.log(error);
                }
              };
              const handleChangeStatus = async (
                slug: string,
                currentStatus: ECourseStatus
              ) => {
                try {
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, update it!",
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      const newStatus =
                        currentStatus === ECourseStatus.PENDING
                          ? ECourseStatus.APPROVED
                          : ECourseStatus.PENDING;
                      await updateCourse({
                        slug,
                        updateCourse: {
                          status: newStatus,
                          _destroy: false,
                        },
                        path: "/manage/course",
                      });
                      toast.success("Cập nhật trạng thái thành công!");
                    }
                  });
                } catch (error) {
                  console.log(error);
                }
              };
              return (
                <TableRow key={item.slug}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Image
                        src={item.image}
                        className="rounded-md flex-shrink-0 object-cover size-16"
                        width={80}
                        height={80}
                        alt=""
                      ></Image>
                      <div className="flex flex-col gap-1">
                        <div className="font-bold text-base">{item.title}</div>
                        <div className="text-sm text-slate-400">
                          {new Date(item.created_at).toLocaleString("vi-VI")}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-base">
                      {item.price.toLocaleString()}đ
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      onClick={() => handleChangeStatus(item.slug, item.status)}
                      className={cn(
                        commonClassNames.status,
                        courseStatusItem?.className
                      )}
                    >
                      {courseStatusItem?.title}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-3">
                      <Link
                        href={"/"}
                        className="size-8 rounded-md border border-gray-200 flex items-center justify-center p-2 hover:-translate-y-2 transition-all"
                      >
                        <IconStudy className="w-full h-full"></IconStudy>
                      </Link>
                      <Link
                        href={"/"}
                        className="size-8 rounded-md border border-gray-200 flex items-center justify-center p-2 hover:-translate-y-2 transition-all"
                      >
                        <IconEye className="w-full h-full"></IconEye>
                      </Link>
                      <Link
                        href={"/"}
                        className="size-8 rounded-md border border-gray-200 flex items-center justify-center p-2 hover:-translate-y-2 transition-all"
                      >
                        <IconEdit className="w-full h-full"></IconEdit>
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDeleteCourse(item.slug)}
                        className="size-8 rounded-md border border-gray-200 flex items-center justify-center p-2 hover:-translate-y-2 transition-all"
                      >
                        <IconDelete className="w-full h-full"></IconDelete>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </>
  );
};

export default CourseManage;
