"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StudentAttrs } from "@/app/types/students";
import {
  CaretSortIcon,
  Pencil2Icon,
  ResetIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { updateStudent } from "@/app/lib/features/students/studentsSlice";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddStudentForm from "@/app/[locale]/components/AddStudentForm";

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
    sortingFn: "datetime",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("birthday")}</div>
    ),
  },
  {
    accessorKey: "id",
  },
  {
    accessorKey: "idnp",
    header: "IDNP",
  },
  {
    accessorKey: "isActive",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      console.log("222", row.getValue("id"));
      const dispatch = useDispatch();
      const studentId = row.getValue("id");
      const isActive = row.getValue("isActive");

      const toggleIsActive = () => {
        // @ts-ignore
        dispatch(
          updateStudent({ id: studentId, student: { isActive: !isActive } }),
        );
      };

      return (
        <div className="flex justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Pencil2Icon className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <AddStudentForm />
            </DialogContent>
          </Dialog>
          <Button variant="ghost" size="icon" onClick={toggleIsActive}>
            {isActive ? (
              <TrashIcon color="#E54D2E" className="h-4 w-4" />
            ) : (
              <ResetIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      );
    },
  },
];
