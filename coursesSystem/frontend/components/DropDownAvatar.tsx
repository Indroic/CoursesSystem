"use client";

import {
  Button,
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";



import Avatar from "./Avatar";

export default function DropDownAvatar() {



  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button className="bg-transparent">
            <Avatar/>
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem
            color="danger"
            className="text-danger"
            onClick={() => signOut()}
          >
            Cerrar Sesión
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
