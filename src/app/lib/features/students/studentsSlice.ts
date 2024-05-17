import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FetchDataResponse, StudentAttrs } from "@/app/types/students";
import { createSelector } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { dateFormat } from "@/lib/utils";
import { date } from "zod";

interface StudentsState {
  entities: StudentAttrs[];
  currentStudent: StudentAttrs;
  loading: boolean;
  loading_by_id: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  searchByName: string;
  searchByIdnp: string;
  startDate: string;
  endDate: string;
}
interface StudentsResponse {
  students: StudentAttrs[];
  page: number;
  totalPages: number;
  totalRecords: number;
}

interface ApiResponse {
  student: StudentAttrs;
}

const initialState: StudentsState = {
  entities: [],
  currentStudent: { id: "", name: "", birthday: "", idnp: "", isActive: true },
  loading: false,
  loading_by_id: false,
  error: null,
  page: 1,
  totalPages: 1,
  searchByName: "",
  searchByIdnp: "",
  startDate: "",
  endDate: "",
};

export const selectFilteredStudents = createSelector(
  [(state) => state.students.entities, (state) => state.students],
  (students, { searchByName, searchByIdnp, startDate, endDate }) => {
    return students
      .filter((student: StudentAttrs) => {
        const birthday = dayjs(student.birthday).format(dateFormat);
        const start = startDate
          ? dayjs(startDate).format(dateFormat)
          : new Date("1900-01-01"); // Use a default far in the past if no start date is given
        const end = endDate ? dayjs(endDate).format(dateFormat) : new Date(); // Use current date if no end date is given

        return (
          (searchByName
            ? student.name.toLowerCase().includes(searchByName.toLowerCase())
            : true) &&
          (searchByIdnp ? student.idnp.includes(searchByIdnp) : true) &&
          (startDate ? birthday >= start : true) &&
          (endDate ? birthday <= end : true)
        );
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  },
);

// Async thunk for fetching students with pagination
export const fetchStudents = createAsyncThunk<
  FetchDataResponse,
  { page: number; pageSize: number }
>("students/fetchStudents", async ({ page, pageSize }, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `/api/students?page=${page}&pageSize=${pageSize}`,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: FetchDataResponse = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue("Failed to fetch students");
  }
});

export const addStudent = createAsyncThunk<StudentAttrs, StudentAttrs>(
  "students/addStudent",
  async (student) => {
    const response = await fetch("/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
    const data: ApiResponse = await response.json();
    return data.student;
  },
);

export const updateStudent = createAsyncThunk<
  StudentAttrs,
  { id: string; student: Partial<StudentAttrs> }
>(
  "students/updateStudent",
  async ({ id, student }: { id: string; student: Partial<StudentAttrs> }) => {
    const response = await fetch(`/api/students/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
    const data: ApiResponse = await response.json();
    return data.student;
  },
);

export const fetchStudentById = createAsyncThunk<StudentAttrs, string>(
  "students/fetchStudentById",
  async (id) => {
    const response = await fetch(`/api/students/${id}`);
    const data: StudentAttrs = await response.json();
    return data;
  },
);

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    searchByName(state, action: PayloadAction<string>) {
      state.searchByName = action.payload;
    },
    searchByIdnp(state, action: PayloadAction<string>) {
      state.searchByIdnp = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchStudents.fulfilled,
        (state, action: PayloadAction<FetchDataResponse>) => {
          state.entities = action.payload.students;
          state.page = action.payload.page;
          state.totalPages = action.payload.totalPages;
          state.loading = false;
        },
      )
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchStudentById.pending, (state) => {
        state.loading_by_id = true;
      })
      .addCase(
        fetchStudentById.fulfilled,
        (state, action: PayloadAction<StudentAttrs>) => {
          state.currentStudent = action.payload;
          state.loading_by_id = false;
        },
      )
      .addCase(
        addStudent.fulfilled,
        (state, action: PayloadAction<StudentAttrs>) => {
          state.entities.push(action.payload);
        },
      )
      .addCase(
        updateStudent.fulfilled,
        (state, action: PayloadAction<StudentAttrs>) => {
          const index = state.entities.findIndex(
            (student) => student.id === action.payload.id,
          );
          if (index !== -1) {
            state.entities[index] = action.payload;
          }
        },
      );
  },
});
export const { searchByName, searchByIdnp, setEndDate, setStartDate } =
  studentsSlice.actions;
export default studentsSlice.reducer;
