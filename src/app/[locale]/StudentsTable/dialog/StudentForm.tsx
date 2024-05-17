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
import { useTranslations } from "use-intl";

interface TranslationFunc {
  (key: string): string;
}

const formSchema = (t: TranslationFunc) =>
  z.object({
    name: z.string().min(1, t("name.error")),
    birthday: z.date().or(
      z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, t("birthday.error"))
        .transform((date) => new Date(date)),
    ),
    idnp: z.string().regex(/^\d{13}$/, t("idnp.error")),
  });

interface FormProps {
  id?: string | null;
  closeDialog: (isOpen: boolean) => void;
}

const StudentForm = ({ id, closeDialog }: FormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations("student.dialog");
  const currentStudent = useSelector(
    (state: RootState) => state.students.currentStudent,
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm<StudentAttrs>({
    defaultValues: {
      id: "",
      name: "",
      birthday: "",
      idnp: "",
      isActive: true,
    },
    resolver: zodResolver(formSchema(t)),
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
      }) && !areFieldsEmpty;

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
      <h1 className=" text-lg font-bold mb-5">
        {isEdit ? t("edit-student") : t("add-student")}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <div>
            <Label htmlFor="name">{t("name.label")}</Label>
            <Input
              type="text"
              id="name"
              placeholder={t("name.placeholder")}
              {...register("name", { required: true })}
            />
            <p className="text-sm text-red-600">{errors.name?.message}</p>
          </div>
          <div>
            <Label htmlFor="birthday">{t("birthday.label")}</Label>
            <Input
              type="date"
              id="birthday"
              placeholder={t("birthday.placeholder")}
              {...register("birthday", { required: true })}
            />
            <p className="text-sm text-red-600">{errors.birthday?.message}</p>
          </div>
          <div>
            <Label htmlFor="idnp">{t("idnp.label")}</Label>
            <Input
              type="text"
              id="idnp"
              placeholder={t("idnp.placeholder")}
              {...register("idnp", { required: true })}
            />
            <p className="text-sm text-red-600">{errors.idnp?.message}</p>
          </div>
          <div className="w-full flex justify-between gap-3 mt-5">
            <DialogClose asChild className="w-full">
              <Button type="button" variant="secondary">
                {t("cancel-button")}
              </Button>
            </DialogClose>
            <Button
              className="w-full"
              disabled={!isDirty || !isValid || !formChanged}
              type="submit"
            >
              {t("save-button")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
