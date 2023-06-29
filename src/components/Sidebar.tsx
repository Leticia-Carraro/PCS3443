import {
  Plane,
  Users,
  Briefcase,
} from "lucide-react"
import Link from 'next/link'

import { Button } from "@/components/ui/button"

export default function Sidebar() {
  return (
    <div className="pb-12">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Bem vindo!
          </h2>
          <div className="space-y-1">

        <Link href="/flight">
            <Button variant="secondary" className="w-full justify-start">
              <Plane className="mr-2 h-4 w-4" />
              {/* Only admin and employees see all */}
              {/* Only users see only yours */}
              Vôos
            </Button>
            </Link>

        <Link href="/partner">
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              {/* Only admin and employees */}
              Sócios
            </Button>
            </Link>

        <Link href="/employee">
            <Button variant="ghost" className="w-full justify-start">
              <Briefcase className="mr-2 h-4 w-4" />
              {/* Only admin */}
              Funcionários
            </Button>
        </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
