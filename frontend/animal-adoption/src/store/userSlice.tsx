// store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    username: string | null;
}

const initialState: UserState = {
    username: localStorage.getItem('username') || null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ username: string }>) => {
            state.username = action.payload.username;
            localStorage.setItem('username', action.payload.username); // Save to localStorage
        },
        logout: (state) => {
            state.username = null;
            localStorage.removeItem('username');
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
