'use client'

import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginRequestPayload } from '@/app/api/schema';
import { Button } from "@/components/ui/button"
import { trpc } from '@/trpc';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { AlertCircle, FileWarning, Terminal } from "lucide-react"

export default function LoginPage() {
  const form = useForm<LoginRequestPayload>({
    resolver: zodResolver(LoginRequestPayload),
    defaultValues: {
      username: "",
      password: "",
    }
  });

  const { push } = useRouter();
  const loginMutation = trpc.login.useMutation({
    onSuccess: () => {
      push('/home')
    }
  });

  const onSubmit: SubmitHandler<LoginRequestPayload> = (data) => {
    loginMutation.mutateAsync({
      username: data.username,
      password: data.password,
    }).then((res) => {
        console.log({role2: res.user.role})
        localStorage.setItem("role", res.user.role ?? "")
      });
  }

  console.log(loginMutation.data)

  return (
    <>
      <div className="flex min-h-full flex-1 flex-wrap flex-col justify-center content-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://www.voceselembra.com/wp-content/uploads/2021/03/Hello-Kitty-1.jpg"
            alt="Flight Club"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Faca login na sua conta
          </h2>
        </div>


        <div className="max-w-md border-red">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Passoword</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {loginMutation.error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>
                    Usuário e senha invalidos!
                  </AlertTitle>
                </Alert>
              )}

              <Button type="submit" disabled={loginMutation.isLoading}>Login</Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}

