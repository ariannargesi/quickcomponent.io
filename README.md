# Quickcomponent.io

This website speed up your component creation process with React.js. Modify content, styles of the elements and click on export button to recive your compnent code with your custom configuration.

## How to use 
First open website [here](http://quickcomponent.io)
### Elements 
 You can see a list of html elements in "Elements" section. Try adding/removing elements. you can also edit the inner text of an html element by opening that element in the three and clicking on it's child. an input appears and you can write your new text.
### Styles 
First select the element that you want to apply styles to in the Elements section. Then you change the styles for that element from left side panel.
### Active styles   
In this section you can see a list of styles that your selected element has. When you change something on styles panel you can see the new value in this panel immediately. Whatever you see in this list will be in your final output.

### Export 
This page contains two main parts. On the right panel you can see your code. You can switch in between your style and script file by clicking on file names, and you can download the whole component in zip format or you can copy the code of the current visible file in the readonly editor.</br>
On the left side, you can see the available configuration for your code. Below you can see a list of available configurations.
* **Props type checking**</br>
You can define your prop name, prop type and determine if it's required or not. The app knows your script language. so it will create props based on that. Uses propTypes for JavaScript and interface for typescript files
* **Test file** </br>
If you select yes, you can see an extra file in your download code named "index.test.[js | ts]"
* **Script language**</br>
*Typescript > using an interface for prop type checking. component return type would be React.ReactNode</br>
Javascript > Using propTypes for prop type checking, and there will be no return type.
* **Style language**</br>
    * Sass
    * Css
* **Props distruction**</br>
Add props distruction to component body
* **Select hooks**</br>
If you select any of those items, it will be imported from react liberary

## Installation
```bash
  git clone: https://github.com/ariannargesi/quickcomponent.io
  cd quickcomponent.io
  yarn install
  yarn start
```
    
