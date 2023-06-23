'use client'

import React from "react";
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Cog6ToothIcon,
  LifebuoyIcon,
  PowerIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from 'next/link'

// profile menu component
const profileMenuItems = [
  {
    label: "Meu Perfil",
    icon: UserIcon,
  },
  {
    label: "Editar Perfil",
    icon: Cog6ToothIcon,
  },
  {
    label: "Ajuda",
    icon: LifebuoyIcon,
  },
  {
    label: "Sair",
    icon: PowerIcon,
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="white"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <UserCircleIcon className="h-8 w-8 p-0.5" />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
              }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
                }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default function Header() {
  return (
    <div className="mx-auto p-2 lg:pl-6 bg-pink-200">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Link href="/">
        <Typography
          variant="h5"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          Clube de Aviação PCS3443
        </Typography>
      </Link>

      <ProfileMenu />
    </div>
    </div >
  );
}
