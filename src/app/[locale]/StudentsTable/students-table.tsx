import { DataTable } from "@/app/[locale]/StudentsTable/data-table";
import { columns } from "@/app/[locale]/StudentsTable/columns";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/lib/store";
import { useEffect, useState } from "react";
import "../../styles/studentTable.scss";
import { fetchStudents } from "@/app/lib/features/students/studentsSlice";
import MaxWidthWrapper from "@/shared/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import StudentForm from "@/app/[locale]/StudentsTable/dialog/StudentForm";
import dayjs from "dayjs";

const StudentsTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const students = useSelector((state: RootState) => state.students.entities);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  return (
    <div>
      <MaxWidthWrapper>
        <div className="container">
          <Dialog open={isOpened} onOpenChange={setIsOpened}>
            <div className=" mb-3 w-full flex justify-end">
              <Button onClick={() => setIsOpened(true)}>Add Student</Button>
            </div>
            <DialogContent className="sm:max-w-[425px]">
              <StudentForm closeDialog={setIsOpened} />
            </DialogContent>
          </Dialog>
          <DataTable columns={columns} data={students} />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};
export default StudentsTable;
