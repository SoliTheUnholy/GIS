"use client";
import { FormEvent, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      number: formData.get("number"),
      password: formData.get("password"),
      redirect: false,
    });
    if (res?.error) {
      setError(res.error as string);
    }
    if (res?.ok) {
      return router.push("/dashboard");
    }
  };
  return (
    <div className="h-[100svh] w-full lg:grid lg:grid-cols-2">
      <form
        className="flex h-[100svh] items-center justify-center px-6 py-12"
        onSubmit={handleSubmit}
      >
        <div className="mx-auto grid w-80 gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">ورود به حساب</h1>
            <p className="text-balance text-muted-foreground">
              شماره تلفن و رمز ورود خود را وارد کنید
            </p>
          </div>
          <div className="grid gap-4">
            {error && (
              <div className="text-center text-sm font-medium text-red-500">
                {error}
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="number">شماره تلفن</Label>
              <Input
                name="number"
                type="number"
                placeholder="09012345678"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex justify-between">
                <Label htmlFor="password">رمز</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm underline"
                >
                  رمز خود را فراموش کرده اید؟
                </Link>
              </div>
              <Input name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              ورود
            </Button>
            <Button variant="outline" className="w-full">
              ورود با رمز یکبار مصرف
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            حساب کاربری ندارید ؟
            <Link href="/register" className="text-primary underline">
              ثبت نام
            </Link>
          </div>
        </div>
      </form>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/papers_girl.png"
          alt="Image"
          width="960"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
