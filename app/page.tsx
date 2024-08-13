"use client";
import Loading from "@/components/loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();
  if (status === "authenticated") {
    router.push("/dashboard");
  } else if (status === "loading") {
    return <Loading />;
  } else {
    router.push("/login");
  }
}
