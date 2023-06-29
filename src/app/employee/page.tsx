'use client'
import { trpc } from "@/trpc";
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import AdminLayout from "@/components/AdminLayout";
import {
  Pencil,
  Trash,
  Eye,
} from "lucide-react"

export default function EmployeePage() {
  const query = trpc.listEmployee.useQuery()
  const isEmpty = query.data?.length === 0

  const deleteMutation = trpc.deleteEmployee.useMutation({
    onSuccess: () => { query.refetch() }
  })

  return (
    <AdminLayout>
      <div className="p-4 space-y-2 h-16">
        <div className="flex flex-row justify-between">
          <h2 className="text-lg font-semibold">
            Funcionario
          </h2>
          <Link href="/employee/new">
            <Button>
              Cadastrar
            </Button>
          </Link>
        </div>

        {query.isLoading && ("Loading...")}
        {isEmpty && (<div>"No employees"</div>)}


        {query.data?.map((employee) => (
           <div key={employee.registerNumber} className="flex items-center hover:bg-slate-100 p-2 rounded">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {employee.name} - {employee.document}
                </p>
                <p className="text-sm text-muted-foreground">
                  {employee.registerNumber}
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
                <Link href={`/employee/${employee.registerNumber}`}>
                  <Button variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  onClick={() => deleteMutation.mutate({ params: { regNum: employee.registerNumber } })}
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
