import {createServer, Model} from 'miragejs';
import {StudentAttrs} from "@/app/types/students";



export function makeServer() {
    return createServer({
        models: {
            student: Model,
        },

        seeds(server) {
            server.create("student", { id: 'o', name: "Buy groceries", birthYear: "1990", idnp: "1234567890123"});
            server.create("student", { id: '1', name: "sadfgh", birthYear: "1990", idnp: "1234567890123"});
            server.create("student", { id: '2', name: "Buy gfhnvfbfbv", birthYear: "1990", idnp: "1234567890123"});

        },
        routes() {
            this.namespace = 'api';

            this.get('/students', (schema: any) => {
                return schema.students.all();
            });

            this.post('/students', (schema: any, request: any) => {
                let attrs = JSON.parse(request.requestBody) as StudentAttrs;
                if (!validateIDNP(attrs.idnp)) {
                    return { error: 'Неверный формат IDNP' };
                }
                return schema.students.create(attrs);
            });

            this.patch('/students/:id', (schema: any, request: any) => {
                let newAttrs = JSON.parse(request.requestBody) as Partial<StudentAttrs>;
                let id = request.params.id;
                let student = schema.students.find(id);
                if (newAttrs.idnp && !validateIDNP(newAttrs.idnp)) {
                    return { error: 'Неверный формат IDNP' };
                }
                return student.update(newAttrs);
            });
        },
    });
}

function validateIDNP(idnp: string): boolean {
    return idnp.length === 13 && /^\d+$/.test(idnp);
}
