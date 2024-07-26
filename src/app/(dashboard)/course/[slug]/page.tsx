"use server";
import PageNotFound from "@/app/not-found";
import IconPlay from "@/components/icons/IconPlay";
import IconStudy from "@/components/icons/IconStudy";
import IconUser from "@/components/icons/IconUser";
import { Button } from "@/components/ui/button";
import { courseLevel } from "@/constants";
import { getByCourse } from "@/lib/actions/course.actions";
import { ECourseStatus } from "@/types/enum";
import Image from "next/image";
import React from "react";

const page = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const data = await getByCourse({ slug: params.slug });
  if (data?.status !== ECourseStatus.APPROVED)
    return <PageNotFound></PageNotFound>;
  if (!data) return;
  return (
    <div className="grid lg:grid-cols-[2fr,1fr] gap-10 min-h-screen">
      <div className="">
        <div className="relative aspect-video mb-5">
          <Image
            src={data.image}
            fill
            alt="#"
            className="w-full h-full object-cover rounded-lg"
          ></Image>
        </div>
        <h1 className="font-bold text-3xl mb-5">{data?.title}</h1>
        <h2 className="font-bold text-xl mb-5">Mô tả:</h2>
        <div className="leading-normal ">{data?.desc}</div>
        <div className="font-bold text-3xl mb-5 mt-10">Thông tin:</div>
        <div className="grid grid-cols-4 gap-5 mb-10">
          <div className="bg-white rounded-lg p-5">
            <h4 className="text-sm text-slate-400">Bài học</h4>
            <h3 className="font-bold">100</h3>
          </div>
          <div className="bg-white rounded-lg p-5">
            <h4 className="text-sm text-slate-400">Lượt xem</h4>
            <h3 className="font-bold">{data.views}</h3>
          </div>
          <div className="bg-white rounded-lg p-5">
            <h4 className="text-sm text-slate-400">Trình độ</h4>
            <h3 className="font-bold">1 </h3>
          </div>
          <div className="bg-white rounded-lg p-5">
            <h4 className="text-sm text-slate-400">Thời lượng</h4>
            <h3 className="font-bold">100</h3>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-5 h-[300px] shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <strong className="text-primary text-xl font-bold">
            {data?.price}
          </strong>
          <span className="text-slate-400 line-through text-sm">
            {data?.sale_price}
          </span>
          <span className="ml-auto inline-block px-3 py-1 rounded-lg bg-primary text-primary bg-opacity-10 font-semibold text-sm">
            {Math.floor((data?.price / data?.sale_price) * 100)}%
          </span>
        </div>
        <h3 className="font-bold mb-3 text-lg">Khóa học gồm có:</h3>
        <ul className="mb-5 flex flex-col gap-2 text-sm text-slate-500">
          <li className="flex items-center gap-2">
            <IconPlay className="size-4" />
            <span>30h học</span>
          </li>
          <li className="flex items-center gap-2">
            <IconPlay className="size-4" />
            <span>Video Full HD</span>
          </li>
          <li className="flex items-center gap-2">
            <IconUser className="size-4" />
            <span>Có nhóm hỗ trợ</span>
          </li>
          <li className="flex items-center gap-2">
            <IconStudy className="size-4" />
            <span>Tài liệu kèm theo</span>
          </li>
        </ul>
        <Button variant={"primary"} className="w-full mt-5">
          Mua khóa học
        </Button>
      </div>
    </div>
  );
};

export default page;
