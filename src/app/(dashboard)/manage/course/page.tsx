import CourseManage from "@/components/course/CourseManage";
import { getAllCourses } from "@/lib/actions/course.actions";
import React from "react";

const page = async () => {
  const data = await getAllCourses();
  return (
    <>
      <CourseManage
        data={data ? JSON.parse(JSON.stringify(data)) : []}
      ></CourseManage>
    </>
  );
};

export default page;
