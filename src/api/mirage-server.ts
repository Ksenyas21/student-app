import { createServer, Model } from "miragejs";
import { StudentAttrs } from "@/app/types/students";
import dayjs from "dayjs";
import { dateFormat } from "@/lib/utils";

export function makeServer({ environment }: { environment: string }) {
  return createServer({
    models: {
      student: Model.extend<Partial<StudentAttrs>>({}),
    },

    seeds(server) {
      server.create("student", {
        id: "0",
        name: "James Smith",
        birthday: dayjs("1999-11-01").format(dateFormat),
        idnp: "1234567890000",
        isActive: true,
      });

      server.create("student", {
        id: "1",
        name: "Olivia Johnson",
        birthday: dayjs("1999-10-15").format(dateFormat),
        idnp: "1234567890001",
        isActive: false,
      });

      server.create("student", {
        id: "2",
        name: "Ethan Williams",
        birthday: dayjs("1999-12-22").format(dateFormat),
        idnp: "1234567890002",
        isActive: true,
      });

      server.create("student", {
        id: "3",
        name: "Sophia Brown",
        birthday: dayjs("1999-09-30").format(dateFormat),
        idnp: "1234567890003",
        isActive: false,
      });

      server.create("student", {
        id: "4",
        name: "Mason Jones",
        birthday: dayjs("1999-08-05").format(dateFormat),
        idnp: "1234567890004",
        isActive: true,
      });

      server.create("student", {
        id: "5",
        name: "Ava Miller",
        birthday: dayjs("1999-07-12").format(dateFormat),
        idnp: "1234567890005",
        isActive: false,
      });

      server.create("student", {
        id: "6",
        name: "Liam Davis",
        birthday: dayjs("1999-05-28").format(dateFormat),
        idnp: "1234567890006",
        isActive: true,
      });

      server.create("student", {
        id: "7",
        name: "Emma Garcia",
        birthday: dayjs("1999-04-19").format(dateFormat),
        idnp: "1234567890007",
        isActive: false,
      });

      server.create("student", {
        id: "8",
        name: "Noah Wilson",
        birthday: dayjs("1999-03-22").format(dateFormat),
        idnp: "1234567890008",
        isActive: true,
      });

      server.create("student", {
        id: "9",
        name: "Mia Martinez",
        birthday: dayjs("1999-02-11").format(dateFormat),
        idnp: "1234567890009",
        isActive: false,
      });

      server.create("student", {
        id: "10",
        name: "Jacob Anderson",
        birthday: dayjs("1999-01-30").format(dateFormat),
        idnp: "1234567890010",
        isActive: true,
      });

      server.create("student", {
        id: "11",
        name: "Isabella Thomas",
        birthday: dayjs("1998-12-15").format(dateFormat),
        idnp: "1234567890011",
        isActive: false,
      });

      server.create("student", {
        id: "12",
        name: "William Jackson",
        birthday: dayjs("1998-11-09").format(dateFormat),
        idnp: "1234567890012",
        isActive: true,
      });

      server.create("student", {
        id: "13",
        name: "Sophia Harris",
        birthday: dayjs("1998-10-05").format(dateFormat),
        idnp: "1234567890013",
        isActive: false,
      });

      server.create("student", {
        id: "14",
        name: "Lucas Clark",
        birthday: dayjs("1998-08-20").format(dateFormat),
        idnp: "1234567890014",
        isActive: true,
      });

      server.create("student", {
        id: "15",
        name: "Evelyn Moore",
        birthday: dayjs("1998-07-22").format(dateFormat),
        idnp: "1234567890015",
        isActive: true,
      });

      server.create("student", {
        id: "16",
        name: "Logan Taylor",
        birthday: dayjs("1998-06-18").format(dateFormat),
        idnp: "1234567890016",
        isActive: false,
      });

      server.create("student", {
        id: "17",
        name: "Amelia Lewis",
        birthday: dayjs("1998-05-16").format(dateFormat),
        idnp: "1234567890017",
        isActive: true,
      });

      server.create("student", {
        id: "18",
        name: "Oliver Robinson",
        birthday: dayjs("1998-04-14").format(dateFormat),
        idnp: "1234567890018",
        isActive: false,
      });

      server.create("student", {
        id: "19",
        name: "Charlotte Walker",
        birthday: dayjs("1998-03-12").format(dateFormat),
        idnp: "1234567890019",
        isActive: true,
      });

      server.create("student", {
        id: "20",
        name: "Elijah Allen",
        birthday: dayjs("1998-02-10").format(dateFormat),
        idnp: "1234567890020",
        isActive: false,
      });

      server.create("student", {
        id: "21",
        name: "Zoe Young",
        birthday: dayjs("1998-01-08").format(dateFormat),
        idnp: "1234567890021",
        isActive: true,
      });

      server.create("student", {
        id: "22",
        name: "Benjamin Hernandez",
        birthday: dayjs("1997-12-30").format(dateFormat),
        idnp: "1234567890022",
        isActive: false,
      });

      server.create("student", {
        id: "23",
        name: "Lily King",
        birthday: dayjs("1997-11-28").format(dateFormat),
        idnp: "1234567890023",
        isActive: true,
      });

      server.create("student", {
        id: "24",
        name: "Alexander Wright",
        birthday: dayjs("1997-10-26").format(dateFormat),
        idnp: "1234567890024",
        isActive: false,
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/students", (schema: any, request: any) => {
        let { page, pageSize } = request.queryParams;

        page = parseInt(page, 10) || 1;
        pageSize = parseInt(pageSize, 10) || 10;

        let studentModel = schema.students.all();
        let totalStudents = studentModel.length;

        let end = page * pageSize;
        end = end > totalStudents ? totalStudents : end;

        let students = studentModel.models.slice(0, end);
        return {
          students: students,
          page,
          totalPages: Math.ceil(totalStudents / pageSize),
          totalRecords: totalStudents,
        };
      });

      this.get("/students/:id", (schema: any, request: any) => {
        let id = request.params.id;
        let student = schema.students.find(id);
        return student ? student.attrs : { error: "Student not found" };
      });

      this.post("/students", (schema: any, request: any) => {
        let attrs = JSON.parse(request.requestBody) as StudentAttrs;
        if (!validateIDNP(attrs.idnp)) {
          return { error: "Wrong format of IDNP" };
        }
        return schema.students.create(attrs);
      });

      this.patch("/students/:id", (schema: any, request: any) => {
        let newAttrs = JSON.parse(request.requestBody) as Partial<StudentAttrs>;
        let id = request.params.id;
        let student = schema.students.find(id);
        if (newAttrs.idnp && !validateIDNP(newAttrs.idnp)) {
          return { error: "Wrong format of IDNP" };
        }
        return student.update(newAttrs);
      });
    },
  });
}

export function validateIDNP(idnp: string): boolean {
  return idnp.length === 13 && /^\d+$/.test(idnp);
}
