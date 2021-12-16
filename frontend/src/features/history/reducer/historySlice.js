import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { historyAPI } from "features/history";


const MODIFY = async (x) => {
    const res = await historyAPI.modify(x)
    return res.data
}
const REMOVE = async (x) => {
    const res = await historyAPI.remove(x)
    return res.data
}
const HMAP = async (x) => {
    const res = await historyAPI.hmap(x)
    return res.data
}

export const modify = createAsyncThunk('history/modify', MODIFY)
export const remove = createAsyncThunk('history/remove', REMOVE)
export const hmap = createAsyncThunk('history/map', HMAP)

const changeNull = ls => {
    for (const i of ls) {
        document.getElementById(i).value = ''
    }
}

const historySlice = createSlice({
    name: 'histories',
    initialState:{
        historyState: {},
        historiesState: [],
        type: '',
        keyword: '',
        params:{}
    },
    reducers: {},
    extraReducers: {
        [modify.fulfilled]: (state, action) => {
            localStorage.setItem('sessionHistory',JSON.stringify(action.payload))
            window.location.href = ''
        },
        [remove.fulfilled]: (state, action) => {
            window.localStorage.removeItem("sessionHistroy");
            window.localStorage.clear();
            window.location.href = ''
        },
        [hmap.fulfilled]: (state, action) => {state.historyState = payload}
    }

})

export const currentHistoryState = state => state.histories.historyState
export const currentHistoriesState = state => state.histories.historiesState
export const currentHistoryParam = state => state.histories.param
export default historySlice.reducer;


