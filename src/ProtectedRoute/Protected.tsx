"use client";

import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Protected({ children }: { children: React.ReactNode }) {
  const { isAuthenticated: token, isLoading: loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.replace("/login"); // * agar token nahi hai → redirect
    }
  }, [loading, token, router]);

  // ? jab tak token verify ho raha hai:-
  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-1000">
        <div className="flex flex-col justify-center items-center gap-4">
          <Loading />
        </div>
      </div>
    );

  if (!token) return null; // token na ho to kuch render hi mat karo

  return <>{children}</>;
}
