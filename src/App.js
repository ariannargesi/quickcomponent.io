import {useState, useEffect} from 'react'

function cssToCamelCase (string){
    /*
    * input: "border-radius" 
    * output: borderRadius
    * */
	let charsArray = string.split('')
	
	string.split('').map((character, index) => {
		if(character === '-' && index != 0){
			charsArray[index+1] = charsArray[index+1].toUpperCase()
		}
		
	})
	
	let resultString = charsArray.filter(character => character != '-').join('')
	return resultString
}

function objectToStyle(object, semi) {
    const keys = Object.keys(object)
    const values = Object.values(object)
    let main = ''
    keys.map((key, index) => {
        let currentLine = ''
        key.split('').map(char => {
            if (char === char.toUpperCase())
                currentLine += '-' + char.toLowerCase()
            else currentLine += char
        })
        currentLine += ': '
        currentLine += values[index]
        if(semi)
            currentLine += ';'
        currentLine += '\n'
        main += currentLine
    })
    return main
}

function generateStyles(){
    let cssProperties = require('./data/css-properties.json')
    console.log(cssProperties)
    const allKeys = Object.keys(cssProperties)
    const styles = {}
    allKeys.map(key => {
       styles[cssToCamelCase(key)] = cssProperties[key].initial
    })
    return styles 
}

function App() {
    const [code, setCode] = useState('')
    const [state, setState] = useState({
        width: '100px',
        height: '100px',
        borderWidth: '3px',
        borderColor: 'black',
        borderStyle: 'solid',
        borderRadius: '0px',
        backgroundColor: 'white'
    })

    useEffect(() => {
        setState(generateStyles())
    }, [])
    
    return (
        <div className="App" style={{
            padding: "0 32px"
        }}>
            <h1>Component builder</h1>
            <div className="pure-g">
                <div className="pure-u-1-3">
                    <div>
                        <label htmlFor="">Width</label>
                        <input type="number" onChange={(e) => setState({...state, width: e.target.value + 'px'})}/>
                    </div>
                    <div>
                        <label htmlFor="">Height</label>
                        <input type="number" onChange={(e) => setState({...state, height: e.target.value + 'px'})}/>
                    </div>
                    <div>
                        <label htmlFor="">Radius</label>
                        <input type="number" onChange={(e) => setState({...state, borderRadius: e.target.value + 'px'})}/>
                    </div>
                    <div>
                        <label htmlFor="">Background</label>
                        <input type="text" onChange={(e) => setState({...state, background: e.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor="">Border width</label>
                        <input type="number" onChange={(e) => setState({...state, borderWidth: e.target.value + 'px'})}/>
                    </div>
                </div>
                <div className="pure-u-2-3"
                     style={{display: 'flex', textAlign: 'center', alignItems: 'center', height: '500px'}}>
                    <div style={{margin: '0 auto'}}>
                        <div style={state}></div>
                    </div>
                </div>
            </div>
            <button onClick={() => setCode(objectToStyle(state, true))} >Get css</button>
            <button onClick={() => setCode(objectToStyle(state, false))} >Get sass</button>
            
            <div>
                <textarea value={code} style={{height: '400px'}}></textarea>
            </div>
        </div>
    );
}

export default App;
