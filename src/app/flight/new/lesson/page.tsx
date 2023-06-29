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
import { FlightLessonCreateRequestPayload, ScoreSchema } from "@/app/api/schema";
import { useRouter } from 'next/navigation';
import AdminLayout from "@/components/AdminLayout";

export default function FlightPage() {
  const route = useRouter()
  const mutation = trpc.createFlight.useMutation({
    onSuccess: () => { route.back() }
  })

  const form = useForm<FlightLessonCreateRequestPayload>({
    resolver: zodResolver(FlightLessonCreateRequestPayload),
    defaultValues: {
      type: "lesson",
      startAt: "",
      endAt: "",
      studentRegistrationNumber: "",
      pilotLicence: "",
      score: "",
    },
  })

  console.log(mutation.error)
  const onSubmit: SubmitHandler<FlightLessonCreateRequestPayload> = (data) => {
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
                    <Input {...field} type="datetime-local" name="timestamp" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studentRegistrationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número da matrícula do estudante</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pilotLicence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número da matrícula do instrutor</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
<FormField
              control={form.control}
              name="score"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Parecer</FormLabel>
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
                          {field.value ?? "Escolha uma nota..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Selecione uma opção" />
                        <CommandEmpty>Escolha uma opção válida</CommandEmpty>
                        <CommandGroup>
                          {ScoreSchema.options.map((option) => (
                            <CommandItem
                              value={option}
                              key={option}
                              onSelect={(value) => field.onChange(ScoreSchema.parse(value.toUpperCase()))}
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
