"use client"
import {useEffect, useState} from "react";
import {makeServer} from "@/api/mirage-server";
import StudentsTable from "@/app/[locale]/components/StudentsTable/StudentsTable";

const MainPage = () => {

    useEffect(() => {
        makeServer();
    },[])

    return (
        <div>
            <StudentsTable />
        </div>
    );
}
export default MainPage;
