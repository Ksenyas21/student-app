'use client';

import { configureStore } from '@reduxjs/toolkit';
import studentsSlice from '@/app/lib/features/students/studentsSlice'

export const store = configureStore({
    reducer: {
        students: studentsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
