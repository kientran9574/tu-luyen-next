"use server";
import Heading from "@/components/common/Heading";
import CourseItem from "@/components/course/CourseItem";
import { getAllCourses } from "@/lib/actions/course.actions";
import React from "react";

const page = async () => {
  const courses = (await getAllCourses()) || [];
  if (!courses) return null;
  return (
    <>
      <Heading>Khám phá</Heading>
      <div className="grid grid-cols-3 gap-8 mt-8">
        {courses.length > 0 &&
          courses?.map((item) => (
            <CourseItem key={item.slug} data={item}></CourseItem>
          ))}
      </div>
    </>
  );
};

export default page;
