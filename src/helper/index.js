import {nanoid} from 'nanoid'
export function cssToCamelCase(string) {
    /*
     * input: "border-radius"
     * output: borderRadius
     * */
    let charsArray = string.split("");

    string.split("").map((character, index) => {
        if (character === "-" && index != 0) {
            charsArray[index + 1] = charsArray[index + 1].toUpperCase();
        }
    });

    let resultString = charsArray
        .filter((character) => character != "-")
        .join("");
    return resultString;
}
export function objectToStyle(object, semi) {
    /*
    input: borderRadius: "40px"
    output: border-radius: 40px 
    * */
    const keys = Object.keys(object);
    const values = Object.values(object);
    let main = "";
    keys.map((key, index) => {
        let currentLine = "";
        key.split("").map((char) => {
            if (char === char.toUpperCase()) currentLine += "-" + char.toLowerCase();
            else currentLine += char;
        });
        currentLine += ": ";
        currentLine += values[index];
        if (semi) currentLine += ";";
        currentLine += "\n";
        main += currentLine;
    });
    return main;
}
export function generateStyles() {
    let cssProperties = require("../data/css-properties.json");
    const allKeys = Object.keys(cssProperties);
    const styles = {};
    allKeys.map((key) => {
        styles[cssToCamelCase(key)] = cssProperties[key].initial;
    });
    return styles;
}
export function isPureCssValue(value) {
    return !(value.indexOf('<') >= 0)
}


export function getCssValues(propertyName) {
    const cssProperties = require('../data/css-properties.json')
    const unFilteredValues = cssProperties[propertyName].syntax
    const unFilteredValuesArray = unFilteredValues.split('|')
    const filteredValues = []
    const temp = []
    unFilteredValuesArray.map(rawValue => {
        rawValue = rawValue.trim()
        if (isPureCssValue(rawValue))
            filteredValues.push(rawValue)
        // else temp.push(rawValue)
    })
    // alert(temp)
    return filteredValues
}

export const findNodeInTree = (tree, key, callback) => {
    tree.forEach(item => {
        if (item.key === key)
            callback(item)
        else if (item.children)
            findNodeInTree(item.children, key, callback)
    })
}


export function deleteNodeInTree(tree, key) {
    tree.forEach((item, index) => {
        if (item.key === key)
            tree.splice(index, 1)
        else if (item.children)
            deleteNodeInTree(item.children, key)
    })
}

export function addNodeInPosition(tree, dropKey, dropPosition, node, dropToGap) {
    tree.forEach(item => {
        if (item.key === dropKey) {
            console.log('drop to gap from hleper: ' + dropToGap)
            if (dropToGap) {
                tree.splice(dropPosition, 0, node)
            } else item.children.splice(dropPosition, 0, node)
        }

        else if (item.children)
            addNodeInPosition(item.children, dropKey, dropPosition, node, dropToGap)
    })
}

export function addStyleInNode(tree, key, propertyName, prpoertyValue) {
    tree.forEach((item) => {
        if (item.key === key) {
            const style = item.props.style
            item.props = {
                ...item.props,
                className: item.title + '_' + nanoid(6),
                style: {
                    ...style,
                    [propertyName]: prpoertyValue
                }
            }
        }
        else if (item.children)
            addStyleInNode(item.children, key, propertyName, prpoertyValue)
    })
}

export function addNodeInTree(tree, key, node) {
    tree.forEach((item, index) => {
        if (item.key === key)
            item.children.push(node)
        else if (item.children)
            addNodeInTree(item.children, key)
    })
}

export function updateNodeTitle(tree, key, value) {
    tree.forEach((item, index) => {
        if (item.key === key)
            item.text = value 
        else if (item.children)
        updateNodeTitle(item.children, key, value)
    })
}