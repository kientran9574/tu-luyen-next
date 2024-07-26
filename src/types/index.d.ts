import { ICourse } from "@/database/course.model";

export type TActiveLinkProps = {
  url: string;
  children: React.ReactNode;
};
export type TMenuItem = {
  title: string;
  url: string;
  icons: React.ReactNode;
};
export type TCreateUserParams = {
  clerkId: string;
  username: string;
  email: string;
  name?: string;
  avatar?: string;
};
export type TCreateCourseParams = {
  title: string;
  slug: string;
  author: string;
};
export type TUpdateCourse = {
  slug: string;
  updateCourse: Partial<ICourse>;
  path?: string;
};
