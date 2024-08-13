"use client";
import { useRef, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { register } from "@/actions/register";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Register() {
  const [error, setError] = useState<string>();
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);
  const handleSubmit = async (formData: FormData) => {
    const r = await register({
      username: formData.get("username"),
      password: formData.get("password"),
      secret: formData.get("secret"),
    });
    ref.current?.reset();
    if (r?.error) {
      setError(r.error);
      return;
    } else {
      return router.push("/login");
    }
  };
  return (
    <div className="flex h-[100svh] w-full items-center justify-center py-12">
      <Card className="absolute mx-auto max-w-96 sm:w-96">
        <CardHeader>
          <CardTitle className="text-xl">ساخت حساب کاربری</CardTitle>
          <CardDescription>
            اطلاعات خود را جهت ساخت حساب وارد کنید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" ref={ref} action={handleSubmit}>
            {error && (
              <div className="text-center text-sm font-medium text-red-500">
                {error}
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="username">نام کاربری</Label>
              <Input
                name="username"
                id="username"
                type="text"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">رمز</Label>
              <Input name="password" id="password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="secret">کد امنیتی</Label>
              <Input name="secret" id="secret" type="password" />
            </div>
            <Button type="submit" className="w-full">
              ساخت حساب کاربری
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            حساب کاربری دارید ؟
            <Link href="/login" className="text-primary underline">
              ورود
            </Link>
          </div>
        </CardContent>
      </Card>
      <div className="hidden h-screen w-full bg-muted lg:block">
        <div className="h-full w-full bg-[url('/register.jpg')] object-cover dark:brightness-[0.2] dark:grayscale"></div>
      </div>
    </div>
  );
}
