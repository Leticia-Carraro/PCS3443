'use client'
import { trpc } from "@/trpc";
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import AdminLayout from "@/components/AdminLayout";
import { format } from 'date-fns'
import {
  Pencil,
  Eye,
  Trash,
} from "lucide-react"


export default function FlightPage() {
  const query = trpc.listFlight.useQuery()
  const isEmpty = query.data?.length === 0

  const deleteMutation = trpc.deleteFlight.useMutation({
    onSuccess: () => { query.refetch() }
  })
  return (
    <AdminLayout>
      <div className="p-4 space-y-2 h-16">
        <div className="flex flex-row justify-between">
          <h2 className="text-lg font-semibold">
            Voos
          </h2>
          <div className="space-x-2">
          <Link href="/flight/new/lesson">
            <Button>
              + Lição de voo
            </Button>
          </Link>
          <Link href="/flight/new/solo">
            <Button>
              + Voo solo
            </Button>
          </Link>
          </div>
        </div>

        {query.isLoading && ("Loading...")}
        {isEmpty && (<div>"Sem voos a exibir"</div>)}


        {query.data?.map((flight) => (
            <div key={flight.slug} className="flex items-center hover:bg-slate-100 p-2 rounded">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {flight.slug} - {flight.pilot.name} {flight.student?.name && '/'} {flight.student?.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(flight.startAt), "dd/MM/yyyy HH:mm")} - {format(new Date(flight.endAt), "dd/MM/yyyy HH:mm")}
                </p>
              </div>
              <div className="ml-auto font-medium">
                {/*
                <Link href={`/employee/${employee.registerNumber}/edit`}>
                  <Button variant="ghost">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </Link>
*/}
                <Link href={`/flight/${flight.slug}`}>
                  <Button variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  onClick={() => deleteMutation.mutate({ params: { slug: flight.slug } })}
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
