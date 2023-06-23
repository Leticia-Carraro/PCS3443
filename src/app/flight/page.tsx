'use client'
import AdminLayout from "@/component/AdminLayout";
import { List, ListItem, Typography } from "@material-tailwind/react";

export default function FlightPage() {
  return (
    <AdminLayout>
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Flight Page
        </Typography>
      </div>

      <List>
        <ListItem>
          <div>
            <Typography variant="h6" color="blue-gray">
              Candice Wu
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              Software Engineer @ Material Tailwind
            </Typography>
          </div>
        </ListItem>
      </List>
    </AdminLayout>
  )
}
