import { configureStore } from '@reduxjs/toolkit'

import userReducer from './userSlice';
import spinnerReducer from './spinnerSlice';

export default configureStore({
        reducer: {
            user: userReducer,
            spinner : spinnerReducer
        },
      })