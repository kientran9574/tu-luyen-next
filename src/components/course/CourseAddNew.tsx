"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import slugify from "slugify";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createCourse } from "@/lib/actions/course.actions";
import { IUser } from "@/database/user.model";
const CourseAddNew = ({ user }: { user: IUser }) => {
  const route = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);
  const formSchema = z.object({
    title: z.string().min(10, "Tên khóa học phải tối thiểu là 10 kí tự"),
    slug: z.string().optional(),
  });
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmit(true);
    try {
      const data = {
        title: values.title,
        slug:
          values.slug ||
          slugify(values.title, {
            lower: true,
            locale: "vi",
          }),
        author: user._id,
      };
      const res = await createCourse(data);
      if (!res?.success) {
        toast.error(res?.message);
      }
      if (res?.success) {
        toast.success("Tạo khóa học thành công");
      }
      if (res?.data) {
        route.push(`/manage/course/update?slug=${res.data.slug}`);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsSubmit(false);
      }, 500);
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-8 mt-10">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên khóa học *</FormLabel>
                  <FormControl>
                    <Input placeholder="Tên khóa học" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Đường dẫn khóa học *</FormLabel>
                  <FormControl>
                    <Input placeholder="duong-dan-khoa-hoc" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            variant={"primary"}
            isLoading={isSubmit}
            className="mt-10 w-[120px]"
            type="submit"
          >
            Tạo khóa học
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CourseAddNew;
