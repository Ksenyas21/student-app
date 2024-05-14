import { createServer, Model } from "miragejs";
import { StudentAttrs } from "@/app/types/students";

export function makeServer() {
  return createServer({
    models: {
      student: Model,
    },

    seeds(server) {
      server.create("student", {
        id: "0",
        name: "Abram doe",
        birthday: new Date("03/11/1999"),
        idnp: "1234567890891",
        isActive: false,
      });
      server.create("student", {
        id: "1",
        name: "Bruno Dolgan",
        birthday: new Date("11/01/2000"),
        idnp: "6703967381902",
        isActive: true,
      });
      server.create("student", {
        id: "2",
        name: "Cian Levchuk ",
        birthday: new Date("12/03/2005"),
        idnp: "1234567890123",
        isActive: true,
      });
    },
    routes() {
      this.namespace = "api";

      this.get("/students", (schema: any) => {
        return schema.students.all();
      });

      this.post("/students", (schema: any, request: any) => {
        let attrs = JSON.parse(request.requestBody) as StudentAttrs;
        if (!validateIDNP(attrs.idnp)) {
          return { error: "Неверный формат IDNP" };
        }
        return schema.students.create(attrs);
      });

      this.patch("/students/:id", (schema: any, request: any) => {
        let newAttrs = JSON.parse(request.requestBody) as Partial<StudentAttrs>;
        let id = request.params.id;
        let student = schema.students.find(id);
        if (newAttrs.idnp && !validateIDNP(newAttrs.idnp)) {
          return { error: "Неверный формат IDNP" };
        }
        return student.update(newAttrs);
      });
    },
  });
}

export function validateIDNP(idnp: string): boolean {
  return idnp.length === 13 && /^\d+$/.test(idnp);
}
