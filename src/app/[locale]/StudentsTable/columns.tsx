"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StudentAttrs } from "@/app/types/students";
import { CaretSortIcon } from "@radix-ui/react-icons";
import * as React from "react";
import { Button } from "@/components/ui/button";
import StudentTableActions from "@/app/[locale]/StudentsTable/student-table-actions";
import { useTranslations } from "use-intl";

export const columns: ColumnDef<StudentAttrs>[] = [
  {
    accessorKey: "id",
    header: () => {
      const t = useTranslations("student.page.table.header");
      return t("id");
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      const t = useTranslations("student.page.table.header");
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t("name")}
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "birthday",
    header: () => {
      const t = useTranslations("student.page.table.header");
      return t("birthday");
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("birthday")}</div>
    ),
  },
  {
    accessorKey: "idnp",
    header: () => {
      const t = useTranslations("student.page.table.header");
      return t("idnp");
    },
  },
  {
    accessorKey: "isActive",
    header: () => {
      const t = useTranslations("student.page.table.header");
      return t("actions");
    },
    enableHiding: false,
    cell: ({ row }) => <StudentTableActions row={row} />,
  },
];
