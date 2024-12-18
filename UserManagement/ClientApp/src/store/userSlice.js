import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserRegister = createAsyncThunk(
    'user/register',
    async user => {
        const response = await axios.post('account/register', user);
        return user;
    });

export const fetchUserUpdate = createAsyncThunk(
    'user/update',
    async user => {
        const response = await axios.put('account/update', user);
        return user;
    });

export const fetchLogout = createAsyncThunk(
    'user/logout',
    async () => {
        await axios.post('account/logout');
    });

export const fetchLogin = createAsyncThunk(
    'user/login',
    async loginModel => {
        console.log("loginModel", loginModel);
        const response = await axios.post('account/login', loginModel);
        console.log("response", response);
        return response.data;
    });

const userInitialState =  {
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        email: '',
        phone: '',
        password: '',
        passwordConfirmation: '',
        civicAddress: '',
        city: '',
        province: '',
        postalCode: '',
        // id: 0,
        // firstName: 'Slava',
        // lastName: 'Slava',
        // gender: 'male',
        // dateOfBirth: '2023-10-19',
        // email: 'ssss@sss.com',
        // phone: '1234567890',
        // password: 'qwertyuiop[]',
        // passwordConfirmation: 'qwertyuiop[]',
        // civicAddress: 'sdfas',
        // city: 'asdfads',
        // province: 'pei',
        // postalCode: 'h4m2r1',
    }

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: userInitialState,
        isLogin: false
    },
    reducers: {
        formUpdated(state, action) {
            state.user[action.payload.key] = action.payload.value;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUserRegister.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLogin = true;
            })
            .addCase(fetchUserUpdate.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(fetchLogout.fulfilled, (state, action) => {
                state.user = userInitialState;
                state.isLogin = false;
            })            
            .addCase(fetchLogin.fulfilled, (state, action) => {
                console.log("action", action);
                state.user = action.payload;
                state.isLogin = true;
            })
    }
}
)

// Action creators are generated for each case reducer function
export const { formUpdated, logout } = userSlice.actions

export default userSlice.reducer;