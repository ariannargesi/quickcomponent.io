import { createSlice, current, nanoid } from '@reduxjs/toolkit'
import  generateCode, {ExportTypes, ScriptFormats, StyleFormats} from '../../../helper/codeGenerators'

function log (x) {
  console.log(current(x))
}

const initialState =  {
    files: [
        {fileName: 'style.sass', content: 'hello world'},
        {fileName: 'index.ts', content: 'hello world from script'}
    ],
    config: {
        testFile: true,
        script: ScriptFormats.TS,
        style: StyleFormats.SASS,
        exportType: ExportTypes.Default,
        propsList: [],
        componentName: 'App',
    }
}

const counterSlice = createSlice({
    name: 'export',
    initialState,
    reducers: {     
      updateConfig: (state, action) => {
        state.config[action.payload.key] = action.payload.value 
        const str = generateCode(state.config)
      }
    },
})

export const {updateConfig} = counterSlice.actions
export default counterSlice.reducer
