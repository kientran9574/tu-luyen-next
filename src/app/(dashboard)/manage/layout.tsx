import PageNotFound from "@/app/not-found";
import { getUserInfo } from "@/lib/actions/user.actions";
import { EUserRole } from "@/types/enum";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  if (!userId) return redirect("/sign-in");
  const user = await getUserInfo({ userId });
  if (user && user.role !== EUserRole.ADMIN)
    return <PageNotFound></PageNotFound>;
  return <>{children}</>;
};

export default AdminLayout;
