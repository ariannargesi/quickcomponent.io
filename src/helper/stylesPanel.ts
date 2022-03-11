export const isKeyword = (x: string): boolean => x.indexOf('<') === -1 && x.indexOf('>') === -1

export enum PickerTypes {
    Range = 'Range',
    List = 'List',
    Color = 'Color',
    Input = 'Input' 
}

export const getPickerType = (syntax: string): PickerTypes => { 
    if(syntax.indexOf('<length>') != -1)
        return PickerTypes.Range
    else if(syntax.indexOf('<color>') != -1)
        return PickerTypes.Color     
    else if(syntax.indexOf('||') != -1 || syntax.indexOf('[') != -1 || syntax.indexOf(']') != -1)
        return PickerTypes.Input 
    else if(syntax.indexOf(' | ') != -1)
        return PickerTypes.List
    else return PickerTypes.Input  
}

export const getListValues = (syntax: string): string[] => {
    return syntax.split(' | ')
}