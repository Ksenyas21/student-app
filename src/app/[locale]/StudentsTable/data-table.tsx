"use client";

import * as React from "react";
import TableFilters from "@/app/[locale]/StudentsTable/table-filters";
import { cn, dateFormat } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  fetchStudents,
  selectFilteredStudents,
} from "@/app/lib/features/students/studentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/lib/store";
import dayjs from "dayjs";
import StudentTableActions from "@/app/[locale]/StudentsTable/student-table-actions";

export const DataTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const scrollContainerRef = useRef(null);
  const [pageSize] = useState(10);
  const { entities, loading, page, totalPages } = useSelector(
    (state: RootState) => state.students,
  );
  const filteredStudents = useSelector(selectFilteredStudents);

  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollTop, clientHeight, scrollHeight } =
        scrollContainerRef.current;

      if (
        scrollTop + clientHeight >= scrollHeight - 100 &&
        page < totalPages &&
        !loading
      ) {
        dispatch(fetchStudents({ page: page + 1, pageSize }));
      }
    }
  }, [dispatch, page, pageSize, totalPages, loading, entities]);

  useEffect(() => {
    dispatch(fetchStudents({ page, pageSize }));
  }, [dispatch, page, pageSize]);

  useEffect(() => {
    const container: HTMLDivElement = scrollContainerRef.current!;
    if (container) {
      container?.addEventListener("scroll", handleScroll);
      return () => {
        container?.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);

  return (
    <div>
      <div className="filters">
        <TableFilters />
      </div>
      <div
        ref={scrollContainerRef}
        style={{ height: "400px", overflow: "auto" }}
        className="rounded-md border"
      >
        {filteredStudents.map((student: any) => (
          <div
            key={student.id}
            className={cn("flex items-center p-2 border-b hover:bg-gray-200", {
              "line-through bg-gray-100 text-gray-400": !student.isActive,
            })}
          >
            <div className="w-1/4">{student.id}</div>
            <div className="w-1/4">{student.name}</div>
            <div className="w-1/4">
              {dayjs(student.birthday).format(dateFormat)}
            </div>
            <div className="w-1/4">{student.idnp}</div>

            <StudentTableActions row={student} />
          </div>
        ))}
      </div>
    </div>
  );
};
