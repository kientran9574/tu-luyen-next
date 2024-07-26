"use server";
import { TCreateCourseParams, TUpdateCourse } from "@/types";
import connectDatabase from "../mongoose";
import Course, { ICourse } from "@/database/course.model";
import { revalidatePath } from "next/cache";

// fetching
export async function getByCourse({
  slug,
}: {
  slug: string;
}): Promise<ICourse | undefined> {
  try {
    connectDatabase();
    const findCourse = await Course.findOne({ slug });
    return findCourse;
  } catch (error) {
    console.log(error);
  }
}
// fetching all
export async function getAllCourses(): Promise<ICourse[] | undefined> {
  try {
    connectDatabase();
    const allCourse = (await Course.find()) || [];
    return allCourse;
  } catch (error) {
    console.log(error);
  }
}
// CRUD
export async function createCourse(params: TCreateCourseParams) {
  try {
    connectDatabase();
    const existCourse = await Course.findOne({ slug: params.slug });
    if (existCourse) {
      return {
        success: false,
        message: "Đường dẫn khóa học đã tồn tại",
      };
    }
    const course = await Course.create(params);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(course)),
    };
  } catch (error) {
    console.log(error);
  }
}
export async function updateCourse(params: TUpdateCourse) {
  try {
    connectDatabase();
    const findCourse = await Course.findOne({ slug: params.slug });
    if (!findCourse) return null;
    await Course.findOneAndUpdate(findCourse, params.updateCourse, {
      new: true,
    });
    revalidatePath(params.path || "/");
    return {
      success: true,
      message: "Cập nhật khóa học thành công",
    };
  } catch (error) {
    console.log(error);
  }
}
