"use client";

import React, { useState } from "react";
import { RiArrowLeftSLine, RiArrowDownSLine } from "@remixicon/react";
const MenuSelect = ({ children }: { children: React.ReactNode }) => {
  return (
    <section
      className={
        "flex-col w-[20dvw] py-8w-max-[20dvw] min-w-min hidden md:flex  h-full border-r-1 border-white top-10  gap-4"
      }
    >
      {children}
    </section>
  );
};

const MenuSelectHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={"order-1 border-b-1 py-5 font-semibold border-white"}>
      {children}
    </div>
  );
};

const MenuSelectBody = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div
      className={
        "order-1 py-5 px-0 flex flex-col gap-4  transition-all ease-in-out duration-300"
      }
    >
      {children}
    </div>
  );
};

const MenuSelectBodyItem = ({
  title,
  children,
  ...props
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="order-1 w-full" {...props}>
      <button
        className="flex flex-row w-full justify-between"
        onClick={() => setOpen(!open)}
      >
        {title}
        {open ? <RiArrowDownSLine /> : <RiArrowLeftSLine />}
      </button>
      <div
        className={`grid overflow-hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr]  hidden"
        } `}
      >
        <div className="px-5 flex flex-col gap-2">{children}</div>
      </div>
    </div>
  );
};

export { MenuSelect, MenuSelectHeader, MenuSelectBody, MenuSelectBodyItem };
