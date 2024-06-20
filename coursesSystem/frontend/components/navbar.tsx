"use client";
import {
  Link,
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import NextLink from "next/link";
import { useState } from "react";
import DropDownAvatar from "./DropDownAvatar";

export const Navbar = () => {
  const [isMenuOpen, isMenuOpenChange] = useState(false);
  const items = [
    { label: "Mis Cursos", href: "/courses/my-courses" },
    { label: "Cursos", href: "/courses" },
    { label: "Inicio", href: "/" },
  ];


  return (
    <NextUINavbar
      onMenuOpenChange={isMenuOpenChange} // eslint-disable-line
      maxWidth="xl"
      position="sticky"
      isBordered
      isBlurred={false}
      className="bg-transparent text-white"
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        className="sm:hidden"
      />
      <NavbarContent className="basis-1/4 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">ACME</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent
        className="hidden sm:flex basis-1/5 gap-6 sm:basis-full"
        justify="end"
      >
        {items.map((item, index) => (
          <NavbarItem key={index}>
            <Link href={item.href}>
              <span className="text-white">{item.label}</span>
            </Link>
          </NavbarItem>
        ))}
        <NavbarItem className="flex flex-row gap-2 justify-center items-center">
        <DropDownAvatar/>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {items.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link color="foreground" href={item.href}>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem className="mt-4">
          <DropDownAvatar/>
        </NavbarMenuItem>
      </NavbarMenu>
    </NextUINavbar>
  );
};
