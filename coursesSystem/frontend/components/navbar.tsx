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
  Avatar,
} from "@nextui-org/react";
import NextLink from "next/link";
import { useState } from "react";

export const Navbar = () => {
  const [isMenuOpen, isMenuOpenChange] = useState(false);
  const username = "probando";
  const items = [
    { label: "Mis Cursos", href: "/courses/my-courses" },
    { label: "Cursos", href: "/courses" },
    { label: "Inicio", href: "/" },
  ];

  return (
    <NextUINavbar
      onMenuOpenChange={isMenuOpenChange}
      maxWidth="xl"
      position="sticky"
      isBordered
      className=" top-4"
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
            <Link color="foreground" href={item.href}>
              {item.label}
            </Link>
          </NavbarItem>
        ))}
        <NavbarItem>
          <Avatar className="max-h-8 max-w-8" name={username} />
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
          <Avatar className="max-h-8 max-w-8" name={username} />
        </NavbarMenuItem>
      </NavbarMenu>
    </NextUINavbar>
  );
};
