"use server";
import Heading from "@/components/common/Heading";
import CourseUpdate from "@/components/course/CourseUpdate";
import { getByCourse } from "@/lib/actions/course.actions";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: {
    slug: string;
  };
}) => {
  const course = await getByCourse({ slug: searchParams.slug });
  console.log(course);
  console.log("check course ", searchParams.slug);
  if (!course) return null;
  return (
    <>
      <Heading className="mb-10">Chỉnh sửa Khóa học</Heading>
      <CourseUpdate data={JSON.parse(JSON.stringify(course))}></CourseUpdate>
    </>
  );
};

export default page;
