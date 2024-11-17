"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { signUpUserSchema } from "@/db/schema/users";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { SessionContext } from "@/store/session-context";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const sessionCtx = useContext(SessionContext);

  if (sessionCtx?.session) {
    router.push("/");
    return null;
  }

  const form = useForm<z.infer<typeof signUpUserSchema>>({
    resolver: zodResolver(signUpUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      user_role: "user",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpUserSchema>) {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      toast.error("Failed to register");
    }

    toast.success("Registered successfully");
    router.push("/");
  }

  return (
    <div className="flex items-center justify-center py-24">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Rejestracja</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwa</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hasło</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Zarejestruj się
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
