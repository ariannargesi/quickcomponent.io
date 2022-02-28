import commands from '../../data/commands'

const generateSourceCode = (list: string[]): string => {
    let res = ''
    list.forEach(item => {
        res+= commands[item]
        res+='\n'
    })
    return res 
}

export const getSourceCode = (list: string[]): string => {
    return generateSourceCode(list)
}

