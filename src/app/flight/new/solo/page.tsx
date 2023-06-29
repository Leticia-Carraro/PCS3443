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
import { FlightSoloCreateRequestPayload } from "@/app/api/schema";
import { useRouter } from 'next/navigation';
import AdminLayout from "@/components/AdminLayout";
import { FormEvent } from "react";

export default function FlightPage() {
  const route = useRouter()
  const mutation = trpc.createFlight.useMutation({
    onSuccess: () => { route.back() }
  })

  const form = useForm<FlightSoloCreateRequestPayload>({
    resolver: zodResolver(FlightSoloCreateRequestPayload),
    defaultValues: {
      type: "solo",
      startAt: new Date(),
      endAt: new Date(),
      pilotLicense: "",
    },
  })

  console.log(mutation.error)
  const onSubmit: SubmitHandler<FlightSoloCreateRequestPayload> = (data) => {
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
              name="startAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horário de ínicio</FormLabel>
                  <FormControl>
                    <Input {...field} type="datetime-local" name="timestamp"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horário de término</FormLabel>
                  <FormControl>
                    <Input {...field} type="datetime-local" name="timestamp"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="pilotLicense"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Licensa do piloto</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
