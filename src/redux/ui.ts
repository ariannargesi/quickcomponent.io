import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    showElementDrawer: false
}

const slice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleElementsDrawer: (state) => {
            state.showElementDrawer = !state.showElementDrawer
        }
    }
})

export const {toggleElementsDrawer} = slice.actions

export default slice.reducer