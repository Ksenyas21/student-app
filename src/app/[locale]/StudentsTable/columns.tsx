"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StudentAttrs } from "@/app/types/students";
import { CaretSortIcon } from "@radix-ui/react-icons";
import * as React from "react";
import { Button } from "@/components/ui/button";

import StudentTableActions from "@/app/[locale]/StudentsTable/student-table-actions";

export const columns: ColumnDef<StudentAttrs>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "birthday",
    header: "Birthday",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("birthday")}</div>
    ),
  },
  {
    accessorKey: "id",

    enableHiding: false,
  },
  {
    accessorKey: "idnp",
    header: "IDNP",
  },
  {
    accessorKey: "isActive",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => <StudentTableActions row={row} />,
  },
];
