"use client"

import { ColumnDef } from "@tanstack/react-table"
import {StudentAttrs} from "@/app/types/students";
import {CaretSortIcon} from "@radix-ui/react-icons";
import * as React from "react";
import {Button} from "@/components/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
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
            )
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
        accessorKey: "idnp",
        header: "IDNP",
    }, {
        header: "Actions",

    },
]
