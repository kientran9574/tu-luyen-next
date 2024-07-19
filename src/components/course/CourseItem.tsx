import Image from "next/image";
import Link from "next/link";
import React from "react";
import IconEye from "../icons/IconEye";
import IconStar from "../icons/IconStar";
import IconClock from "../icons/IconClock";

const CourseItem = () => {
  return (
    <div className="p-4 bg-white rounded-2xl border border-gray-300 shadow-md dark:bg-graySecondary dark:border-grayDark">
      <Link href={"/"} className="block w-full h-[300px] relative">
        <Image
          src={
            "https://images.unsplash.com/photo-1721112796760-fe228d1e22a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt=""
          width={300}
          height={200}
          className="w-full h-full object-cover rounded-2xl"
          // sizes để làm reponsive
          sizes="@media (min-width: 640px) 300px, 100vw"
          //   độ ưu tiên vào trang web sẽ load hình này ra trước
          priority
        ></Image>
        <span className="absolute top-1 right-1 rounded-full bg-green-500 px-3 py-1 inline-block text-white z-10 text-sm">
          new
        </span>
      </Link>
      <div className="pt-4">
        <h3 className="text-xl font-bold mb-6">
          Khóa học Nextjs - xây dựng E-learning system hoàn chỉnh
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <IconEye className="size-5"></IconEye>
              <span className=" text-slate-500 text-lg dark:text-grayDark">1000</span>
            </div>
            <div className="flex items-center gap-2">
              <IconStar className="size-5"></IconStar>
              <span className="t text-slate-500 text-lg dark:text-grayDark">5.0</span>
            </div>
            <div className="flex items-center gap-2">
              <IconClock className="size-5"></IconClock>
              <span className=" text-slate-500 text-lg dark:text-grayDark">30h25p</span>
            </div>
          </div>
          <div className="text-primary text-2xl font-extrabold">799.000</div>
        </div>
        <button className="w-full p-3 text-center rounded-lg text-white bg-primary mt-6 font-extrabold hover:shadow-md dark:bg-opacity-90">
          Xem chi tiết 
        </button>
      </div>
    </div>
  );
};

export default CourseItem;
