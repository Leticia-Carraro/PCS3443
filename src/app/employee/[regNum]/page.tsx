'use client'
import { trpc } from "@/trpc";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import AdminLayout from "@/components/AdminLayout";
import { format } from 'date-fns'
import {
  Trash,
} from "lucide-react"

export default function EmployeePage({ params }: { params: { regNum: string } }) {
  const query = trpc.findEmployee.useQuery({ params })
  const route = useRouter()

  const deleteMutation = trpc.deleteEmployee.useMutation({
    onSuccess: () => { route.back() }
  })

  if (query.isLoading) {
    return <div>Loading...</div>
  }

  if (query.data == null) {
    return <div>Not found</div>
  }

  const employee = query.data

  return (
    <AdminLayout>
      <div className="p-4 space-y-2 h-16">
        <div className="flex flex-row justify-between">
          <h2 className="text-lg font-semibold">
            {employee.name}
          </h2>
          <div>
          </div>
          <Button
            variant="ghost"
            onClick={() => deleteMutation.mutate({ params: { regNum: employee.registerNumber } })}
            disabled={deleteMutation.isLoading}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>

        <div>
          <span className="font-semibold">Username: </span>
          <span>{employee.user.username}</span>
        </div>

        <div>
          <span className="font-semibold">Nome: </span>
          <span>{employee.name}</span>
        </div>

        <div>
          <span className="font-semibold">CPF: </span>
          <span>{employee.document}</span>
        </div>

        <div>
          <span className="font-semibold"> Data de nascimento: </span>
          <span>{format(new Date(employee.birthDate), 'dd/MM/yyyy')}</span>
        </div>

        <div>
          <span className="font-semibold">Registro: </span>
          <span>{employee.registerNumber}</span>
        </div>

        <div>
          <span className="font-semibold">Endereço: </span>
          <span>{employee.address.street}, {employee.address.number} - {employee.address.city}, {employee.address.state}</span>
        </div>
      </div>
    </AdminLayout>
  )
}
