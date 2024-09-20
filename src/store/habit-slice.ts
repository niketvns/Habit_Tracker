import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {habitFrequency} from "../interfaces/globalInterfaces";

export interface Habit {
    id: string;
    name: string;
    frequency: "daily" | "weekly";
    completedDates: string[];
    createdAt: string;
}

interface HabitState {
    habits: Habit[];
    isLoading: boolean;
    error: string | null;
}

const initialState: HabitState = {
    habits: [],
    isLoading: false,
    error: null
}

export const fetchHabits = createAsyncThunk('habits/fetchHabits', async () => {
    await new Promise((resolve) => {
        setTimeout(resolve, 1000)
    })
    return [
        {
            id: "1",
            name: "Read",
            frequency: "daily",
            completedDates: [],
            createdAt: new Date().toISOString()
        },
        {
            id: "2",
            name: "Exercise",
            frequency: "weekly",
            completedDates: [],
            createdAt: new Date().toISOString()
        }
    ] as Habit[]
})

const habitSlice = createSlice({
    name: 'habits',
    initialState,
    reducers: {
        addHabit: (state, action: PayloadAction<{name: string; frequency: habitFrequency}>) => {
            const newHabit: Habit = {
                id: Date.now().toString(),
                name: action.payload.name,
                frequency: action.payload.frequency,
                completedDates: [],
                createdAt: new Date().toDateString()
            }
            state.habits.push(newHabit)
        },
        toggleHabit: (state, action: PayloadAction<{
            id: string; date: string;
        }>) => {
            const habit = state.habits.find(habit => habit.id === action.payload.id)
            if(habit) {
                const index = habit.completedDates.indexOf(action.payload.date)
                if(index !== -1) {
                    habit.completedDates.splice(index, 1)
                } else {
                    habit.completedDates.push(action.payload.date)
                }
            }
        },
        removeHabit: (state, action: PayloadAction<{
            id: string;
        }>) => {
            state.habits = state.habits.filter(habit => habit.id !== action.payload.id)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHabits.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchHabits.fulfilled, (state, action) => {
                state.isLoading = false;
                state.habits = action.payload;
            })
            .addCase(fetchHabits.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch habits';
            })
    }
})

export const {addHabit, toggleHabit, removeHabit} = habitSlice.actions
export default habitSlice.reducer