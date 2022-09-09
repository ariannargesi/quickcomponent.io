import { createSlice } from '@reduxjs/toolkit';
import {
  findNodeInTree,
  deleteNodeInTree,
  addNodeInTree as addNode,
  addStyleInNode,
  removeStyleFromTree,
  updateClassName as changeClassname,
  convertProps,
} from '../../../helper';

import {
  ExportTypes,
  ScriptFormats,
  StyleFormats,
  EditorView,
  typesDecleration,
  RootState,
} from '../../../types';
import {
  styleGenerator,
  scriptGenerator,
} from '../../../helper/codeGenerators';

import initialMap from '../../../welcome-map';

const initialState: RootState = {
  openDrawer: false,
  selectedKey: initialMap[0].key,
  treeHash: null,
  emptyTree: false,
  inputKey: null,
  map: initialMap,
  assets: [],
  config: {
    usingTestFile: true,
    scriptType: ScriptFormats.TS,
    scriptFileName: 'index',
    hooksList: ['useState'],
    propDeclerationType: typesDecleration.Interface,
    styleType: StyleFormats.CSS,
    styleFileName: 'style',
    exportType: ExportTypes.Default,
    propsList: [],
    componentName: 'App',
    propDisctruction: true,
  },
  output: {
    style: '',
    script: '',
    commands: [],
  },
  editorView: EditorView.Script,
};

const counterSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    changeSelectedElement: (state, action) => {
      state.selectedKey = action.payload.key;
    },
    deleteNode: (state, action) => {
      const key = action.payload.key;
      const rootKey = state.map[0].key;
      state.treeHash = key;

      const nodeToDelete = findNodeInTree(state.map, key);

      if (nodeToDelete.title === 'img') {
        state.assets = state.assets.filter(
          // @ts-ignore
          (asset) => asset.src != nodeToDelete.props.src
        );
      }

      if (key === rootKey) {
        deleteNodeInTree(state.map, key);
        state.emptyTree = true;
      } else {
        deleteNodeInTree(state.map, key);
        const element = findNodeInTree(
          state.map,
          state.selectedKey
        );
        if (element === null)
          state.selectedKey = state.map[0].key;
      }
    },
    applyStyle: (state, action) => {
      const { key, value } = action.payload;
      addStyleInNode(
        state.map,
        state.selectedKey,
        key,
        value
      );
    },
    generateCode: (state) => {
      state.output.style = styleGenerator(
        state.map,
        state.config.styleType
      );
      state.output.script = scriptGenerator({
        componentName: state.config.componentName,
        hooksList: state.config.hooksList,
        map: state.map,
        type: state.config.propDeclerationType,
        propsDistruction: state.config.propDisctruction,
        propsList: state.config.propsList,
        scriptType: state.config.scriptType,
        styleType: state.config.styleType,
      });
    },
    updateConfig: (state, action) => {
      const key = action.payload.key;
      const value = action.payload.value;
      if (
        key === 'scriptType' &&
        state.config.scriptType != value &&
        state.config.propsList.length > 0
      ) {
        state.config.propsList = convertProps(
          state.config.propsList
        );
      }
      state.config[action.payload.key] =
        action.payload.value;
      state.output.style = styleGenerator(
        state.map,
        state.config.styleType
      );
      state.output.script = scriptGenerator({
        componentName: state.config.componentName,
        hooksList: state.config.hooksList,
        map: state.map,
        type: state.config.propDeclerationType,
        propsDistruction: state.config.propDisctruction,
        propsList: state.config.propsList,
        scriptType: state.config.scriptType,
        styleType: state.config.styleType,
      });
    },
    toggleEditorView: (state, action) => {
      state.editorView = action.payload.value;
    },
    addNodeInTree: (state, action) => {
      const element = action.payload.element;
      state.treeHash = element.key;

      if (state.map.length === 0) {
        if (element.title === 'div')
          element.props.style = { position: 'relative' };
        state.map.push(element);
        state.emptyTree = false;
      } else {
        addNode(state.map, state.selectedKey, element);
      }
      state.selectedKey = element.key;
    },
    setInputAtKey: (state, action) => {
      state.inputKey = action.payload.key;
    },
    clearInputAtKey: (state) => {
      state.inputKey = null;
    },
    updateTreeInputValue: (state, action) => {
      const value = action.payload.value;
      const element = findNodeInTree(
        state.map,
        state.selectedKey
      );
      if (element.title === 'button') {
        const res = element.children.find(
          (item) => item.key === state.inputKey
        );
        res.text = value;
      } else element.text = value;
      state.inputKey = null;
      state.treeHash = value;
    },
    removeStyle: (state, action) => {
      const property = action.payload;
      removeStyleFromTree(
        state.map,
        state.selectedKey,
        property
      );
    },
    toggleDrawer: (state) => {
      state.openDrawer = !state.openDrawer;
    },
    updateClassName: (state, action) => {
      const { value } = action.payload;
      changeClassname(state.map, state.selectedKey, value);
    },
    addProp: (state, action) => {
      const value = action.payload.value;
      state.config.propsList.push(value);
    },
    deleteProp: (state, action) => {
      const index1 = action.payload.index;
      state.config.propsList =
        state.config.propsList.filter(
          (item, index) => index != index1
        );
    },
    addHook: (state, action) => {
      const value = action.payload;
      state.config.hooksList.push(value);
      state.output.script = scriptGenerator({
        componentName: state.config.componentName,
        hooksList: state.config.hooksList,
        map: state.map,
        type: state.config.propDeclerationType,
        propsDistruction: state.config.propDisctruction,
        propsList: state.config.propsList,
        scriptType: state.config.scriptType,
        styleType: state.config.styleType,
      });
    },
    removeHook: (state, action) => {
      const value = action.payload;
      state.config.hooksList =
        state.config.hooksList.filter(
          (item) => item != value
        );
      state.output.script = scriptGenerator({
        componentName: state.config.componentName,
        hooksList: state.config.hooksList,
        map: state.map,
        type: state.config.propDeclerationType,
        propsDistruction: state.config.propDisctruction,
        propsList: state.config.propsList,
        scriptType: state.config.scriptType,
        styleType: state.config.styleType,
      });
    },
    updateSelectedElementProp: (state, action) => {
      const result = findNodeInTree(
        state.map,
        state.selectedKey
      );
      state.assets.push(action.payload);
      result.name = action.payload.name;
      result.props = {
        ...result.props,
        ...action.payload,
      };
    },
  },
});

export const {
  changeSelectedElement,
  applyStyle,
  updateConfig,
  toggleEditorView,
  deleteNode,
  addNodeInTree,
  setInputAtKey,
  clearInputAtKey,
  updateTreeInputValue,
  generateCode,
  removeStyle,
  toggleDrawer,
  updateClassName,
  addProp,
  deleteProp,
  addHook,
  removeHook,
  updateSelectedElementProp,
} = counterSlice.actions;
export default counterSlice.reducer;
