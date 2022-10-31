import { configureStore, createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
    name: "counter",
    initialState: {list: []},
    reducers: {
        assignList(state, action) {
            state.list = action.payload;
        }
        // increment(state, action) {
        //     state.counter++;
        //  },
        // decrement(state, action) { 
        //     state.counter-- ;
        // },
        // addBy(state, action) { 
        //     state.counter += action.payload;
        // },
    }
})

export const actions = listSlice.actions;
const store = configureStore({reducer: listSlice.reducer}) ;

export default store;