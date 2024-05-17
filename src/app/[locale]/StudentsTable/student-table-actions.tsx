import { useDispatch } from "react-redux";
import { updateStudent } from "@/app/lib/features/students/studentsSlice";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil2Icon, ResetIcon, TrashIcon } from "@radix-ui/react-icons";
import StudentForm from "@/app/[locale]/StudentsTable/dialog/StudentForm";
import * as React from "react";
import { useState } from "react";
import { AppDispatch } from "@/app/lib/store";
import { useToast } from "@/components/ui/use-toast";

const StudentTableActions = ({ row }: { row: any }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const [isOpened, setIsOpened] = useState(false);
  const { id, isActive } = row;

  const toggleIsActive = (): void => {
    try {
      dispatch(updateStudent({ id, student: { isActive: !isActive } }));
      toast({
        title: "Success",
        description: isActive ? "Student expelled" : "Student included",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Failed to exclude student",
      });
    }
  };

  return (
    <div className="flex justify-end">
      <Dialog open={isOpened} onOpenChange={setIsOpened}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Pencil2Icon className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <StudentForm id={id} closeDialog={setIsOpened} />
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
};

export default StudentTableActions;
