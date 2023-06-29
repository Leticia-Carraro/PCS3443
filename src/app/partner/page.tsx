'use client'
import { trpc } from "@/trpc";
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import AdminLayout from "@/components/AdminLayout";
import {
  GraduationCap,
  Wind,
  Rocket,
  Trash,
  Eye,
} from "lucide-react"

function PartnerIcon({type}: {type: string}) {
  if (type == "student") return <GraduationCap className="h-6 w-6" />
  else if (type == "pilot") return <Wind className="h-6 w-6" />
  else if (type == "instructor") return <Rocket className="h-6 w-6" />
  else <div></div>
}

export default function EmployeePage() {
  const query = trpc.listPartner.useQuery();
  const isEmpty = query.data?.length === 0

  const deleteMutation = trpc.deletePartner.useMutation({
    onSuccess: () => { query.refetch() }
  })

  return (
    <AdminLayout>
      <div className="p-4 space-y-2 h-16">
        <div className="flex flex-row justify-between">
          <h2 className="text-lg font-semibold">
            Sócio
          </h2>
          <div className="space-x-2">
            <Link href="/partner/new/student">
              <Button>
                Cadastrar Estudante
              </Button>
            </Link>
            <Link href="/partner/new/pilot">
              <Button>
                Cadastrar Piloto
              </Button>
            </Link>
            <Link href="/partner/new/instructor">
              <Button>
                Cadastrar Instrutor
              </Button>
            </Link>
          </div>
        </div>

        <div className="p-2" />

        {query.isLoading && ("Loading...")}
        {isEmpty && (<div>"No Partners"</div>)}


        {query.data?.map((partner) => (
           <div key={partner.registerNumber} className="flex items-center hover:bg-slate-100 p-2 rounded">
              <PartnerIcon type={partner.user.role} />
              <div className="space-y-1 ml-2">
                <p className="text-sm font-medium leading-none">
                  {partner.name} - {partner.document}
                </p>
                <p className="text-sm text-muted-foreground">
                  {partner.registerNumber}
                </p>
              </div>
              <div className="ml-auto font-medium">
                {/*
                <Link href={`/employee/${partner.registerNumber}/edit`}>
                  <Button variant="ghost">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </Link>
*/}
                <Link href={`/partner/${partner.registerNumber}`}>
                  <Button variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  onClick={() => deleteMutation.mutate({ params: { regNum: partner.registerNumber } })}
                  disabled={deleteMutation.isLoading}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
        ))}
      </div>
    </AdminLayout>
  )
}
