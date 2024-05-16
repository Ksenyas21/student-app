import { createServer, Model } from "miragejs";
import { StudentAttrs } from "@/app/types/students";
import dayjs from "dayjs";
import { dateFormat } from "@/lib/utils";

export function makeServer({ environment }: { environment: string }) {
  return createServer({
    models: {
      student: Model,
    },

    seeds(server) {
      server.create("student", {
        id: "0",
        name: "Abram doe",
        birthday: dayjs("1999-11-03").format(dateFormat),
        idnp: "1234567890891",
        isActive: false,
      });
      server.create("student", {
        id: "1",
        name: "Bruno Dolgan",
        birthday: dayjs("2000-01-11").format(dateFormat),
        idnp: "6703967381902",
        isActive: true,
      });
      server.create("student", {
        id: "2",
        name: "Cian Levchuk ",
        birthday: dayjs("2005-03-12").format(dateFormat),
        idnp: "1234567890123",
        isActive: true,
      });
    },
    routes() {
      this.namespace = "api";

      this.get("/students", (schema: any) => {
        return schema.students.all();
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
