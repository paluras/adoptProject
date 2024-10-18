// store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface UserState {
    username: string | null;
    isAuthenticated: boolean,
    isAdmin: boolean,
    userId: number | null

}

const initialState: UserState = {
    username: localStorage.getItem('username') || null,
    isAuthenticated: !!localStorage.getItem('username'),
    isAdmin: JSON.parse(localStorage.getItem('isAdmin') || 'false'),
    userId: JSON.parse(localStorage.getItem('userId') || 'null'),
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ username: string, isAdmin: boolean, userId: number }>) => {
            state.username = action.payload.username;
            state.isAuthenticated = true;
            state.isAdmin = action.payload.isAdmin;
            state.userId = action.payload.userId;

            localStorage.setItem('username', action.payload.username);
            localStorage.setItem('isAdmin', JSON.stringify(action.payload.isAdmin));
            localStorage.setItem('userId', JSON.stringify(action.payload.userId));
        },
        logout: (state) => {
            state.username = null;
            state.isAuthenticated = false;
            state.isAdmin = false;
            state.userId = null;

            localStorage.removeItem('username');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('userId');
        },
    },
});


export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
