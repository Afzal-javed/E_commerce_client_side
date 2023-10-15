// userSlice.js
// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    fullName: "",
    profile: "",
    _id: ""
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginRedux: (state, action) => {
            state._id = action.payload.data.id;
            state.email = action.payload.data.email;
            state.fullName = action.payload.data.fullName;
            state.profile = action.payload.data.profile;
        },
        logoutRedux: (state, action) => {
            state._id = "";
            state.email = "";
            state.fullName = "";
            state.profile = "";
        }
    }
});

export const { loginRedux, logoutRedux } = userSlice.actions;

// Named export for the reducer
export const userSliceReducer = userSlice.reducer;




// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     email: "",
//     fullName: "",
//     profile: "",
//     _id: ""
// }

// export const userSlice = createSlice({
//     name: "user",
//     initialState,
//     reducers: {
//         loginRedux: (state, action) => {
//             // console.log(action.payload.data);
//             state.id = action.payload.data.id;
//             state.email = action.payload.data.email;
//             state.fullName = action.payload.data.fullName;
//             state.profile = action.payload.data.profile;
//         },
//         logoutRedux: (state, action) => {
//             // console.log(action.payload.data);
//             state.id = "";
//             state.email = "";
//             state.fullName = "";
//             state.profile = "";
//         }
//     }
// })
// export const { loginRedux, logoutRedux } = userSlice.actions

// export default userSlice.reducer