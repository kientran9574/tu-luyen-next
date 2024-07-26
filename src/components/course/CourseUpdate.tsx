"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { ECourseLevel, ECourseStatus } from "@/types/enum";
import { ICourse } from "@/database/course.model";
import { updateCourse } from "@/lib/actions/course.actions";
import { toast } from "react-toastify";
import { useImmer } from "use-immer";
import IconAdd from "../icons/IconAdd";
import { courseLevel, courseStatus } from "@/constants";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
const CourseUpdate = ({ data }: { data: ICourse }) => {
  const router = useRouter();
  const [courseInfo, setCourseInfo] = useImmer({
    requirements: data.info.requirements,
    benefits: data.info.benefits,
    qa: data.info.qa,
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const formSchema = z.object({
    title: z.string().min(10, "Tên khóa học phải tối thiểu là 10 kí tự"),
    slug: z.string().optional(),
    price: z.number().int().positive().optional(),
    sale_price: z.number().int().positive().optional(),
    intro_url: z.string().optional(),
    desc: z.string().optional(),
    image: z.string().optional(),
    views: z.number().int().optional(),
    status: z
      .enum([
        ECourseStatus.APPROVED,
        ECourseStatus.PENDING,
        ECourseStatus.REJECTED,
      ])
      .optional(),
    level: z
      .enum([
        ECourseLevel.BEGINNER,
        ECourseLevel.INTERMEDIATE,
        ECourseLevel.ADVANCED,
      ])
      .optional(),
    info: z.object({
      requirements: z.array(z.string()).optional(),
      benefits: z.array(z.string()).optional(),
      qa: z
        .array(z.object({ question: z.string(), answer: z.string() }))
        .optional(),
    }),
  });
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data.title,
      slug: data.slug,
      price: data.price,
      sale_price: data.sale_price,
      intro_url: data.intro_url,
      desc: data.desc,
      views: data.views,
      status: data.status,
      level: data.level,
      image: data.image,
      info: {
        requirements: data.info.requirements,
        benefits: data.info.benefits,
        qa: data.info.qa,
      },
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsSubmit(true);
    try {
      const res = await updateCourse({
        slug: data.slug,
        updateCourse: {
          title: values.title,
          slug: values.slug,
          price: values.price,
          sale_price: values.sale_price,
          intro_url: values.intro_url,
          desc: values.desc,
          views: values.views,
          status: values.status,
          level: values.level,
          image: values.image,
          info: {
            requirements: courseInfo.requirements,
            benefits: courseInfo.benefits,
            qa: courseInfo.qa,
          },
        },
      });
      console.log(res);
      if (values.slug) {
        router.replace(`/manage/course/update?slug=${values.slug}`);
      }
      if (res?.success) {
        toast.success(res.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsSubmit(false);
      }, 500);
    }
  }
  const imgWatch = form.watch("image");
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-8 mt-10 min-h-screen">
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
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gía khuyến mãi *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="599.000"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sale_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gía gốc *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="999.000"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả khóa học *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Mô tả khóa học"
                      className="min-h-[200px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ảnh đại diện *</FormLabel>
                  <FormControl>
                    <div className="border border-gray-200 rounded-lg bg-white min-h-[200px] flex items-center justify-center relative">
                      {!imgWatch ? (
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            console.log(res);
                            form.setValue("image", res[0].url);
                          }}
                          onUploadError={(error: Error) => {
                            // Do something with the error.
                            console.error(error);
                          }}
                        />
                      ) : (
                        <Image
                          src={imgWatch}
                          alt=""
                          fill
                          className="w-full h-full object-cover"
                        ></Image>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="intro_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Youtube URL *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.youtube.com/abcdxyz"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="views"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lượt xem *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="1000"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trạng thái *</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        {courseStatus.map((status) => (
                          <SelectItem value={status.value} key={status.value}>
                            {status.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trình độ *</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Trình độ" />
                      </SelectTrigger>
                      <SelectContent>
                        {courseLevel.map((status) => (
                          <SelectItem value={status.value} key={status.value}>
                            {status.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="info.requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between gap-5 items-center">
                    <span>Yêu cầu *</span>
                    <button
                      type="button"
                      className="text-primary"
                      onClick={() => {
                        setCourseInfo((draft) => {
                          draft.requirements.push("");
                        });
                      }}
                    >
                      <IconAdd></IconAdd>
                    </button>
                  </FormLabel>
                  <FormControl>
                    <>
                      {courseInfo.requirements.map((item, index) => (
                        <>
                          <Input
                          key={`index ${index + 1}`}
                            placeholder={`Yêu cầu số ${index + 1}`}
                            type="text"
                            value={item}
                            onChange={(e) => {
                              setCourseInfo((draft) => {
                                draft.requirements[index] = e.target.value;
                              });
                            }}
                          />
                        </>
                      ))}
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="info.benefits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between gap-5 items-center">
                    <span>Lợi ích *</span>
                    <button
                      type="button"
                      className="text-primary"
                      onClick={() => {
                        setCourseInfo((draft) => {
                          draft.benefits.push("");
                        });
                      }}
                    >
                      <IconAdd></IconAdd>
                    </button>
                  </FormLabel>
                  <FormControl>
                    <>
                      {courseInfo.benefits.map((item, index) => (
                        <>
                          <Input
                            key={`index ${index + 1}`}
                            placeholder={`Lợi ích số ${index + 1}`}
                            type="text"
                            value={item}
                            onChange={(e) => {
                              setCourseInfo((draft) => {
                                draft.benefits[index] = e.target.value;
                              });
                            }}
                          />
                        </>
                      ))}
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="info.qa"
              render={({ field }) => (
                <FormItem className="col-start-1 col-end-3">
                  <FormLabel className="flex justify-between gap-5 items-center">
                    <span>Q&A *</span>
                    <button
                      type="button"
                      className="text-primary animate-bounce"
                      onClick={() => {
                        setCourseInfo((draft) => {
                          draft.qa.push({
                            question: "",
                            answer: "",
                          });
                        });
                      }}
                    >
                      <IconAdd></IconAdd>
                    </button>
                  </FormLabel>
                  <FormControl>
                    <>
                      {courseInfo.qa.map((item, index) => (
                        <>
                          <div className="grid grid-cols-2 gap-5" key={index}>
                            <Input
                              placeholder={`Câu hỏi số ${index + 1}`}
                              type="text"
                              value={item.question}
                              onChange={(e) => {
                                setCourseInfo((draft) => {
                                  draft.qa[index].question = e.target.value;
                                });
                              }}
                            />
                            <Input
                              placeholder={`Trả lời số ${index + 1}`}
                              type="text"
                              value={item.answer}
                              onChange={(e) => {
                                setCourseInfo((draft) => {
                                  draft.qa[index].answer = e.target.value;
                                });
                              }}
                            />
                          </div>
                        </>
                      ))}
                    </>
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
            Update khóa học
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CourseUpdate;
