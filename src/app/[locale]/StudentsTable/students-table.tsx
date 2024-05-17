import { DataTable } from "@/app/[locale]/StudentsTable/data-table";
import { useState } from "react";
import "../../styles/studentTable.scss";
import MaxWidthWrapper from "@/shared/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import StudentForm from "@/app/[locale]/StudentsTable/dialog/StudentForm";
import { useTranslations } from "use-intl";

const StudentsTable = () => {
  const [isOpened, setIsOpened] = useState(false);
  const t = useTranslations("student.page");

  return (
    <div>
      <MaxWidthWrapper>
        <div className="container">
          <Dialog open={isOpened} onOpenChange={setIsOpened}>
            <div className=" mb-3 w-full flex justify-between">
              <h1 className="font-bold text-lg">{t("title")}</h1>
              <Button onClick={() => setIsOpened(true)}>
                {t("add-student-button")}
              </Button>
            </div>
            <DialogContent className="sm:max-w-[425px]">
              <StudentForm closeDialog={setIsOpened} />
            </DialogContent>
          </Dialog>

          <DataTable />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default StudentsTable;
