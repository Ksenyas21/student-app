"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addStudent,
  fetchStudentById,
  updateStudent,
} from "@/app/lib/features/students/studentsSlice";
import { StudentAttrs } from "@/app/types/students";
import { AppDispatch, RootState } from "@/app/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { DialogClose } from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { dateFormat } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(1, "Имя фамилия не может быть пустым"),
  birthday: z.date().or(
    z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Неверный формат даты")
      .transform((date) => new Date(date)),
  ),
  idnp: z.string().regex(/^\d{13}$/, "IDNP должен состоять из 13 цифр"),
});

interface FormProps {
  id?: string | null;
  closeDialog: (isOpen: boolean) => void;
}

const StudentForm = ({ id, closeDialog }: FormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const currentStudent = useSelector(
    (state: RootState) => state.students.currentStudent,
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<StudentAttrs>({
    defaultValues: {
      id: "",
      name: "",
      birthday: "",
      idnp: "",
      isActive: true,
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<StudentAttrs> = (data) => {
    isEdit ? handleUpdateStudent(data) : handleAddStudent(data);
  };

  const studentId = id as string;

  const isEdit = !!id;
  const [formChanged, setFormChanged] = useState(false);
  const formValues = watch();

  useEffect(() => {
    if (studentId !== null) {
      handleFetchStudentById(studentId);
    }
  }, [studentId]);

  useEffect(() => {
    const initialValues = {
      ...currentStudent,
    };

    const areFieldsEmpty = Object.values(formValues).some(
      (value) => typeof value === "string" && value?.trim() === "",
    );

    const isChanged =
      Object.keys(initialValues).some((key) => {
        return (
          initialValues[key as keyof StudentAttrs] !==
          formValues[key as keyof StudentAttrs]
        );
      }) && !areFieldsEmpty; // Also ensure no fields are empty

    setFormChanged(isChanged);
  }, [formValues, formChanged]);

  const handleFetchStudentById = (id: string) => {
    dispatch(fetchStudentById(id))
      .then((actionResult) => {
        if (fetchStudentById.fulfilled.match(actionResult)) {
          setValue("id", actionResult.payload.id);
          setValue("name", actionResult.payload.name);
          setValue("birthday", actionResult.payload.birthday);
          setValue("idnp", actionResult.payload.idnp);
          setValue("isActive", actionResult.payload.isActive);
        } else {
          console.error("Failed to fetch student");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch student", error);
      });
  };

  const handleUpdateStudent = (data: StudentAttrs): void => {
    dispatch(
      updateStudent({
        id: studentId,
        student: { ...data, birthday: dayjs(data.birthday).format(dateFormat) },
      }),
    );
    closeDialog(false);
  };

  const handleAddStudent = (data: StudentAttrs) => {
    const student = {
      ...data,
      birthday: dayjs(data.birthday).format(dateFormat),
      isActive: true,
    };
    dispatch(addStudent(student));
    closeDialog(false);
  };

  return (
    <div>
      <h2>{isEdit ? "Edit" : "Add"} Student</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <div>
            <Label htmlFor="name">Name:</Label>
            <Input
              type="text"
              id="name"
              {...register("name", { required: true })}
            />
            <p className="text-sm text-red-600">{errors.name?.message}</p>
          </div>
          <div>
            <Label htmlFor="birthday">Birth Year:</Label>
            <Input
              type="date"
              id="birthday"
              {...register("birthday", { required: true })}
            />
            <p className="text-sm text-red-600">{errors.birthday?.message}</p>
          </div>
          <div>
            <Label htmlFor="idnp">IDNP:</Label>
            <Input
              type="text"
              id="idnp"
              {...register("idnp", { required: true })}
            />
            <p className="text-sm text-red-600">{errors.idnp?.message}</p>
          </div>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button disabled={!isDirty || !isValid || !formChanged} type="submit">
            {isEdit ? "Edit" : "Add"} Student
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
