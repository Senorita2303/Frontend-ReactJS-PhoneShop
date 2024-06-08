import { createSlice } from "@reduxjs/toolkit";
import axios from "../../common";

const initialState = {
    isLoading: false,
    isAuthenticated: false,
    user: localStorage.getItem('user') ? localStorage.getItem('user') : {},
    error: null,
    users: [],
    isDeleted: false,
    isUpdated: false,
    userId: "",
    email: "",
    success: false,
    message: "",
}
const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        userSuccess(state, action) {
            state.isLoading = false;
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
            state.error = action.payload.errMessage;
        },
        logoutSuccess(state) {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        },
        updateRegisterEmail(state, action) {
            state.isLoading = false;
            state.email = action.payload.email;
            state.userId = action.payload.userId;
        },
        updateSuccess(state, action) {
            state.isLoading = false;
            state.isUpdated = action.payload.success;
            state.error = action.payload.errMessage;
            state.user = action.payload.user;
        },
        deleteSuccess(state, action) {
            state.isLoading = false;
            state.isDeleted = action.payload.success;
            state.message = action.payload.message;
        },
        forgotPasswordSuccess(state, action) {
            state.isLoading = false;
            state.message = action.payload.message;
            state.error = action.payload.errMessage;
        },
        resetPasswordSuccess(state, action) {
            state.isLoading = false;
            state.success = action.payload.success;
            state.error = action.payload.errMessage;
        },
        allUsersSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            state.users = action.payload;
        },
        userDetailsSuccess(state, action) {
            state.isLoading = false;
            state.user = action.payload;
        },

        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        registerUserFail: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        loadUserFail: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        updateReset(state) {
            state.isUpdated = false;
        },
        updateLoading(state) {
            state.isLoading = false;
        },
        deleteReset(state) {
            state.isDeleted = false;
        },
        clearError(state) {
            state.error = null;
        },
    }
});

// Reducer
export default slice.reducer;

// login user
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.post(
            `/api/auth/login`,
            { email, password },
            config
        );
        dispatch(slice.actions.userSuccess(data));
        window.localStorage.setItem("user", JSON.stringify(data.user));
        window.localStorage.setItem("access_token", data.accessToken);
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
};

export const loginSuccess = (id, tokenLogin) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.post(
            `/api/auth/login-success`,
            { id, tokenLogin },
            config
        );
        dispatch(slice.actions.userSuccess(data));
        window.localStorage.setItem("user", JSON.stringify(data.user));
        window.localStorage.setItem("access_token", data.accessToken);
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
}

// resgister user
export const signUp = (signupData) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = {
            headers: { "Content-Type": "multipart/form-data" },
        };
        const { data } = await axios.post(
            `/api/auth/register`,
            signupData,
            config
        );
        dispatch(slice.actions.updateRegisterEmail(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
};

export const SendOtp = (email, userId) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
            `/api/auth/send-otp`,
            { email, userId },
            config
        );
        if (data) {
            dispatch(slice.actions.updateLoading());
        }
    } catch (error) {
        dispatch(slice.actions.registerUserFail(error.response.data.message));
    }
};

export const VerifyEmail = (formValues) => async (dispatch) => {
    try {
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.post(
            `api/auth/verify`,
            formValues,
            config
        );
        window.localStorage.setItem("user", JSON.stringify(data.user));
        dispatch(slice.actions.userSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
};

// export const googleLogin = (loginData) => async (dispatch) => {
//     try {
//         dispatch(slice.actions.startLoading());
//         const config = {
//             headers: {
//                 "Content-Type": "multipart/form-data"
//             }
//         };
//         const { data } = await axios.post(
//             `/api/user/google`,
//             loginData,
//             config
//         );
//         dispatch(slice.actions.userSuccess(data.user));
//         window.localStorage.setItem("user", JSON.stringify(data.user));
//     } catch (error) {
//         dispatch(slice.actions.hasError(error.response.data.message));
//     }
// };


// Load User (user Profile) if logged in before
export const loadUser = () => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get("/api/user/profile");
        dispatch(slice.actions.userSuccess(data));
        window.localStorage.setItem("user", JSON.stringify(data.user));

    } catch (error) {
        dispatch(slice.actions.loadUserFail(error.response));
    }
};

// logout user
export function logout() {
    return async function (dispatch) {
        try {
            window.localStorage.removeItem("user");
            await axios.get(`/api/auth/logout`); // token will expired from cookies and no more user data access
            dispatch(slice.actions.logoutSuccess());
        } catch (error) {
            dispatch(slice.actions.hasError(error.message));
        }
    }
}

// Update Profile
export function updateProfile(userData) {
    return async function (dispatch) {
        try {
            dispatch(slice.actions.startLoading());
            const config = {
                headers: { "Content-Type": "multipart/form-data" },
            };
            const { data } = await axios.put(
                `/api/user/profile/update`,
                userData,
                config
            );
            if (data.user !== undefined && data.user) {
                localStorage.removeItem("user");
                localStorage.setItem("user", JSON.stringify(data.user))
            }
            dispatch(slice.actions.updateSuccess(data));
        } catch (error) {
            dispatch(slice.actions.hasError(error.message));
        }
    }
}


export function updatePassword(userPassWord) {
    return async function (dispatch) {
        try {
            dispatch(slice.actions.startLoading());
            const config = {
                headers: { "Content-Type": "application/json" },
            };
            const { data } = await axios.put(
                `/api/user/password/update`,
                userPassWord,
                config
            );
            dispatch(slice.actions.updateSuccess(data));
        } catch (error) {
            dispatch(slice.actions.hasError(error.response.data.message));
        }
    }
}

// forgetPassword;
export const forgetPassword = (email) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post(
            `/api/auth/forgot-password`,
            email,
            config
        );
        dispatch(slice.actions.forgotPasswordSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
};

// reset password action
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        };
        const { data } = await axios.put(
            `/api/auth/password/reset/${token}`,
            passwords,
            config
        );
        dispatch(slice.actions.resetPasswordSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
};

// get All user Action --> admin
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get("/api/user/admin/users");
        dispatch(slice.actions.allUsersSuccess(data.users));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
}

// get User details --> admin
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.get(`/api/user/admin/user/${id}`);
        dispatch(slice.actions.userDetailsSuccess(data.user));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
}

// upadte user role ---> admin
export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.put(
            `/api/user/admin/user/${id}`, userData,
            config
        );
        dispatch(slice.actions.updateSuccess(data.success));

    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }

}

// detele User ---> admin
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch(slice.actions.startLoading());
        const { data } = await axios.delete(`/api/user/admin/user/${id}`);
        dispatch(slice.actions.deleteSuccess(data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.response.data.message));
    }
}

export const updateReset = () => async (dispatch) => {
    dispatch(slice.actions.updateReset());
};

export const deleteReset = () => async (dispatch) => {
    dispatch(slice.actions.deleteReset());
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch(slice.actions.clearError());
};
