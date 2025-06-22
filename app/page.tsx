'use client';
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
   <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-4">
      <p className="text-2xl font-bold">RealTime Task Manager</p>
      <p className="text-lg">Login or Register to continue</p>
      <Button onClick={() => router.push(ROUTES.LOGIN)}>Login</Button>
      <Button onClick={() => router.push(ROUTES.REGISTER)}>Register</Button>
    </div>
  );
}
