import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";

import Avatar from "./Avatar";

export default function DropDownAvatar() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="p-0 m-0 bg-transparent">
          <Avatar />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          className="text-danger"
          color="danger"
          onClick={() => signOut()}
        >
          Cerrar Sesión
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
