"use client";

import { useEffect } from "react";
import { makeServer } from "@/api/mirage-server";
import StudentsTable from "@/app/[locale]/StudentsTable/students-table";

const MainPage = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      makeServer({ environment: "development" });
    }
  }, []);

  return <StudentsTable />;
};

export default MainPage;
