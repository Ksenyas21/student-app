"use client"

import { ColumnDef } from "@tanstack/react-table"
import {StudentAttrs} from "@/app/types/students";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const columns: ColumnDef<StudentAttrs>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "birthYear",
        header: "Year",
    },
    {
        accessorKey: "idnp",
        header: "IDNP",
    },
]
