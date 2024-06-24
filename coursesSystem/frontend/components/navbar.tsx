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
import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { getCookie } from "cookies-next";
import { memo } from "react";

import useNavbar from "@/store/navbar";

import DropDownAvatar from "./DropDownAvatar";

export const Navbar = () => {
  const { isMenuOpen, items, toggleMenu, setItems, loaded, changeLoaded } =
    useNavbar();

  useEffect(() => {
    const fetchPermissions = async () => {
      if (getCookie("permissions") && !loaded) {
        const permissions = (getCookie("permissions") as string).split(",");
        const filteredItems = [
          {
            label: "Mis Cursos",
            href: "/home/courses/my-courses",
            permission: "courses.add_course",
          },
          {
            label: "Cursos",
            href: "/home/courses",
            permission: "courses.view_course",
          },
          { label: "Inicio", href: "/" },
        ].filter(
          (item) => !item.permission || permissions.includes(item.permission)
        );
        setItems(filteredItems);
        
        changeLoaded();
      }
    };

    fetchPermissions();
  }, []);

  return (
    <NextUINavbar
      onMenuOpenChange={toggleMenu} // eslint-disable-line
      maxWidth="xl"
      position="sticky"
      isBordered
      className="dark bg-background/10 text-white"
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
        justify="center"
      >
        {items.map((item, index) => (
          <NavbarItem key={index}>
            <Link href={item.href}>
              <span className="text-white">{item.label}</span>
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <DropDownAvatar />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="dark bg-background/10">
        {items.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link color="foreground" href={item.href}>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem className="mt-4">
          <NavbarItem
            onClick={() => signOut()}
            className="text-danger"
            as={"button"}
          >
            Cerrar Sesion
          </NavbarItem>
        </NavbarMenuItem>
      </NavbarMenu>
    </NextUINavbar>
  );
};
