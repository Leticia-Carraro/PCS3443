'use client'

import React from "react";
import Link from 'next/link'
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  RocketLaunchIcon,
  BriefcaseIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

export default function Sidebar() {
  return (
    <div className="min-h-full w-full p-4 bg-pink-100">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Bem vindo!
        </Typography>
      </div>
      <List>
        <Link href="/flight">
          <ListItem>
            <ListItemPrefix>
              <RocketLaunchIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Typography color="blue-gray" className="mr-auto font-normal">
              {/* Only admin and employees see all */}
              {/* Only users see only yours */}
              Vôos
            </Typography>
          </ListItem>
        </Link>

        <Link href="/partner">
          <ListItem>
            <ListItemPrefix>
              <UsersIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Typography color="blue-gray" className="mr-auto font-normal">
              {/* Only admin and employees */}
              Sócios
            </Typography>
          </ListItem>
        </Link>

        <Link href="/employee">
          <ListItem>
            <ListItemPrefix>
              <BriefcaseIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Typography color="blue-gray" className="mr-auto font-normal">
              {/* Only admin */}
              Funcionários
            </Typography>
          </ListItem>
        </Link>
      </List>
    </div>
  );
}
