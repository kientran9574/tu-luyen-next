import Heading from "@/components/common/Heading";
import CourseAddNew from "@/components/course/CourseAddNew";
import { getUserInfo } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const page = async () => {
  const { userId } = auth();
  if (!userId) return null;
  const mongoUser = await getUserInfo({ userId });
  console.log(mongoUser);
  if (!mongoUser) return null;
  return (
    <>
      <Heading>Thêm khóa học</Heading>
      <CourseAddNew user={JSON.parse(JSON.stringify(mongoUser))}></CourseAddNew>
    </>
  );
};

export default page;
