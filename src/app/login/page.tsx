'use client'

import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginRequestPayload } from '@/app/api/schema';
import { trpc } from '@/trpc';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequestPayload>({
    resolver: zodResolver(LoginRequestPayload),
  });

  const { push } = useRouter();
  const loginMutation = trpc.login.useMutation({
    onSuccess: () => {
      push('/home')
    }
  });

  const onSubmit: SubmitHandler<LoginRequestPayload> = (data) => {
    loginMutation.mutate({
      username: data.username,
      password: data.password,
    });
  }

  console.log(loginMutation.data)

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="username"
                  {...register("username")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Senha
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {loginMutation.error && (
              <div className="text-red-500">
                Usuário ou senha inválidos
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loginMutation.isLoading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

