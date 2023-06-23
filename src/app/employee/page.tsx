'use client'
import AdminLayout from "@/component/AdminLayout";
import { trpc } from "@/trpc";
import { Button, List, ListItem, Typography } from "@material-tailwind/react";
import Link from 'next/link'

export default function EmployeePage() {
  const query = trpc.listEmployee.useQuery()

  console.log(query.data)
  const isEmpty = query.data?.length === 0

  return (
    <AdminLayout>
      <div className="p-4">
        <div className="flex flex-row justify-between content-center">
          <div className="mb-2 p-4">
            <Typography variant="h5" color="blue-gray">
              Employee Page
            </Typography>
          </div>

          <Link href="/employee/create">
            <Button color="purple" >
              Add New
            </Button>
          </Link>
        </div>

        {query.isLoading && ("Loading...")}
        {isEmpty && ("No employees")}

        {query.data?.map((employee) => (
          <List>
            <ListItem>
              <div>
                <Typography variant="h6" color="blue-gray">
                  {employee.name} - {employee.document}
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                  {employee.registerNumber}
                </Typography>
              </div>
            </ListItem>
          </List>
        ))}
      </div>
    </AdminLayout>
  )
}
