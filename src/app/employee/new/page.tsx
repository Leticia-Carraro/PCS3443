'use client'
import { trpc } from "@/trpc";
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import { Check, ChevronsUpDown, AlertCircle } from "lucide-react"
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
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form";
import { EmployeeCreateRequestPayload, StateSchema } from "@/app/api/schema";
import { Separator } from "@/components/ui/separator";
import { useRouter } from 'next/navigation';
import AdminLayout from "@/components/AdminLayout";

export default function EmployeePage() {
  const route = useRouter()
  const mutation = trpc.createEmployee.useMutation({
    onSuccess: () => { route.back() }
  })

  const form = useForm<EmployeeCreateRequestPayload>({
    resolver: zodResolver(EmployeeCreateRequestPayload),
    defaultValues: {
      username: "",
      password: "",
      name: "",
      document: "",
      birthDate: new Date(),
      address: {
        state: "SP",
        city: "São Paulo",
        street: "",
        number: 0,
        complement: "",
      },
      registerNumber: "",
    },
  })

  console.log(mutation.error)
  const onSubmit: SubmitHandler<EmployeeCreateRequestPayload> = (data) => {
    mutation.mutate(data)
  }

  return (
    <AdminLayout>
      <div className="space-y-6 p-6">
        <div>
          <h3 className="text-lg font-medium">Informações de cadastro</h3>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="document"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="registerNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numero de cadastro do funcionario</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />
            <div>
              <h3 className="text-lg font-medium">Endereço</h3>
            </div>
            <FormField
              control={form.control}
              name="address.state"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Estado</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ?? "Select language"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Procure pela sigla do estado..." />
                        <CommandEmpty>Nenhum estado encontrado</CommandEmpty>
                        <CommandGroup>
                          {StateSchema.options.map((option) => (
                            <CommandItem
                              value={option}
                              key={option}
                              onSelect={(value) => field.onChange(StateSchema.parse(value.toUpperCase()))}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  option === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {option}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rua</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numero</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} value={field.value == 0 ? "" : field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.complement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complemento</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />
            <div>
              <h3 className="text-lg font-medium">Acesso a plataforma</h3>
            </div>
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
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {mutation.isError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Algo deu errado :(
                </AlertDescription>
              </Alert>
            )}

            <Button type="submit" disabled={mutation.isLoading}>Criar</Button>
          </form>
        </Form>
      </div>
    </AdminLayout>
  )
}
