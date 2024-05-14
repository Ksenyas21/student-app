"use client"
import {useEffect, useState} from "react";
import {makeServer} from "@/api/mirage-server";
import StudentsTable from "@/app/[locale]/components/StudentsTable/students-table";

const MainPage = () => {
    useEffect(() => {
        makeServer();
    },[])

    return <StudentsTable />

}
export default MainPage;
