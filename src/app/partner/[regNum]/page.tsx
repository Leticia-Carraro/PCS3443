'use client'
import { trpc } from "@/trpc";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import AdminLayout from "@/components/AdminLayout";
import { format } from 'date-fns'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import {
  PartyPopper,
  Trash,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormEvent, useState } from "react";
import { PilotSchema } from "@/app/api/schema";

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod"

function translateType(type: string): string | undefined {
  if (type == "student") return "Estudante"
  else if (type == "pilot") return "Piloto"
  else if (type == "instructor") return "Instrutor"
}

const LicenseSchema = PilotSchema.pick({license: true})

export default function EmployeePage({ params }: { params: { regNum: string } }) {
  const query = trpc.findPartner.useQuery({ params })
  const summaryQuery = trpc.summaryLessonFlights.useQuery({ params: { studentRegistrationNumber: params.regNum } })
  const route = useRouter()

  const [open, setOpen] = useState(false);
  const licenceMutation = trpc.updateStudentToPilot.useMutation({
    onSuccess() {
      query.refetch()
    }
  })

  const form = useForm<z.infer<typeof LicenseSchema>>({
    resolver: zodResolver(LicenseSchema),
    defaultValues: {
      license: ""
    }
  })
  const onSubmit: SubmitHandler<z.infer<typeof LicenseSchema>> = (data) => {
    licenceMutation.mutate({
      params,
      body: data
    })
    setOpen(false)
  }

  const deleteMutation = trpc.deleteEmployee.useMutation({
    onSuccess: () => { route.back() }
  })
  console.log(params)
  console.log(query.data)

  if (query.isLoading) {
    return <div>Loading...</div>
  }

  if (query.data == null) {
    return <div>Not found</div>
  }

  const partner = query.data

  return (
    <AdminLayout>
      <div className="p-4 space-y-2 h-16">
        <div className="flex flex-row justify-between">
          <h2 className="text-lg font-semibold">
            {partner.name}
          </h2>
          <div>
          </div>
          <Button
            variant="ghost"
            onClick={() => deleteMutation.mutate({ params: { regNum: partner.registerNumber } })}
            disabled={deleteMutation.isLoading}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>

        <div>
          <span className="font-semibold">Username: </span>
          <span>{partner.user.username}</span>
        </div>

        <div>
          <span className="font-semibold">Tipo: </span>
          <span>{translateType(partner.user.role)}</span>
        </div>

        <div>
          <span className="font-semibold">Nome: </span>
          <span>{partner.name}</span>
        </div>

        <div>
          <span className="font-semibold">CPF: </span>
          <span>{partner.document}</span>
        </div>

        <div>
          <span className="font-semibold"> Data de nascimento: </span>
          <span>{format(new Date(partner.birthDate), 'dd/MM/yyyy')}</span>
        </div>

        <div>
          <span className="font-semibold"> Email: </span>
          <span>{partner.email}</span>
        </div>

        <div>
          <span className="font-semibold">Registro: </span>
          <span>{partner.registerNumber}</span>
        </div>

        {partner.license && (
          <div>
            <span className="font-semibold">Licença: </span>
            <span>{partner.license}</span>
          </div>
        )}

        {partner.course && (
          <div>
            <span className="font-semibold">Curso: </span>
            <span>{partner.course}</span>
          </div>
        )}

        {partner.institution && (
          <div>
            <span className="font-semibold">Instituição: </span>
            <span>{partner.institution}</span>
          </div>
        )}

        {partner.graduationDate && (
          <div>
            <span className="font-semibold">Data de graduação: </span>
            <span>{format(new Date(partner.graduationDate), 'dd/MM/yyyy')}</span>
          </div>
        )}

        <div>
          <span className="font-semibold">Endereço: </span>
          <span>{partner.address.street}, {partner.address.number} - {partner.address.city}, {partner.address.state}</span>
        </div>

        {partner.user.role == "student" && summaryQuery.data?.flightHours && (
          <div>
            <span className="font-semibold">Horas em vôo: </span>
            <span>{summaryQuery.data?.flightHours} horas</span>
          </div>
        )}

        {partner.user.role == "student" && summaryQuery.data?.averageScore && (
          <div>
            <span className="font-semibold">Nota média: </span>
            <span>{summaryQuery.data?.averageScore}</span>
          </div>
        )}


        {partner.user.role == "student" && summaryQuery.data?.allowLicense && (
          <Alert>
            <PartyPopper className="h-4 w-4" />
            <AlertTitle>
              A licença do aluno já pode ser solicitada!
            </AlertTitle>
            <AlertDescription>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">Solicitar licença</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Solicitar licença</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                      <FormField
                        control={form.control}
                        name="license"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Licença</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button type="submit">Submit</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </AlertDescription>
          </Alert>
        )}
      </div>
    </AdminLayout>
  )
}
