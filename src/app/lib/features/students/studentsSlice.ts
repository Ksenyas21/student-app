import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {StudentAttrs} from "@/app/types/students";


interface StudentsState {
    entities: StudentAttrs[];
    loading: boolean;
}
interface StudentsResponse {
    students: StudentAttrs[];
}
interface ApiResponse {
    student: StudentAttrs;
}


const initialState: StudentsState = {
    entities: [],
    loading: false,
};

export const fetchStudents = createAsyncThunk<StudentAttrs[]>(
    'students/fetchStudents',
    async () => {
        const response = await fetch('/api/students');
        const data: StudentsResponse = await response.json();
        return data.students;
    }
);

export const addStudent = createAsyncThunk<StudentAttrs, StudentAttrs>(
    'students/addStudent',
    async (student) => {
        const response = await fetch('/api/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(student),
        });
        const data: ApiResponse = await response.json();
        return data.student
    }
);

export const updateStudent = createAsyncThunk<StudentAttrs, { id: string; student: Partial<StudentAttrs> }>(
    'students/updateStudent',
    async ({ id, student }) => {
        const response = await fetch(`/api/students/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(student),
        });
        const data: ApiResponse = await response.json();
        console.log(data, 'data')
        return data.student;
    }
);

const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudents.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchStudents.fulfilled, (state, action: PayloadAction<StudentAttrs[]>) => {
                state.entities = action.payload;
                state.loading = false;
            })
            .addCase(addStudent.fulfilled, (state, action: PayloadAction<StudentAttrs>) => {
                state.entities.push(action.payload);
            })
            .addCase(updateStudent.fulfilled, (state, action: PayloadAction<StudentAttrs>) => {
                const index = state.entities.findIndex(student => student.id === action.payload.id);
                if (index !== -1) {
                    state.entities[index] = action.payload;
                }
            });
    },
});

export default studentsSlice.reducer;
