import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Input, Button, Select } from 'antd'
import { Switch, Modal } from 'antd';
import { selectUnstyledClasses } from '@mui/base';
import { Trash } from 'react-feather';
const { Option } = Select;

interface Prop {
    onConfirm: any
}

interface AddPropsProp {
    onChange: any
}

const AddProps = (props: AddPropsProp) => {
    let name
    let type
    let defaultValue


}

const propTypesKeys = Object.keys(PropTypes)
const typesList = propTypesKeys.filter(key => {
    if (PropTypes[key].name === 'bound checkType')
        return true
    return false
})



console.log(typesList)
typesList.push('any')

// form initial state
const initialForm = {
    name: '',
    type: 'any',
    required: false  
}

const PropConfig = (props: Prop) => {
    const [visible, setVisible] = useState(false);

    const [propsList, setPropsList] = useState([])
    const [form, setForm] = useState(initialForm)
   
    const handleChange = (e) => {        
        console.log(e)
        setForm(prev => {
            return {
                ...prev, 
                ...e    
            }
        })
    }

    const handleAddProp = () => {
        setPropsList(prev => [...prev, form])
        setForm(initialForm)
    }

    const handleDelete = (index) => {
        setPropsList(propsList => {
            return propsList.filter((item, index2) => index != index2)
        })
    }    

    return (
        <Modal
title="Config props"
centered
visible={visible}
onOk={() => setVisible(false)}
footer={false}
onCancel={() => setVisible(false)}
width={600}
>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
                <label htmlFor="name">Name</label>
                <Input value={form.name} onChange={e => handleChange({name: e.target.value})} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="name">Name</label>
                <Select defaultValue={form.type} onChange={e => handleChange({type: e})} style={{ width: 120 }}>
                    {typesList.map(item => {
                        return (
                            <Option value={item}>{item}</Option>
                        )
                    })}
                </Select>
                
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <label>required:</label>
                <Switch defaultChecked onChange={e => handleChange({required: e})} />
                </div>
            <Button onClick={handleAddProp}>Add</Button>
        </div>
        <div>
            {propsList.map((item, index) => {
                return (
                    <div>
                        <span>{item.name}</span>
                        <span>{item.type}</span>
                        <span>{item.required}</span>
                        <Trash onClick={() => handleDelete(index)}/>
                    </div> 
                )
            })}
        </div>
        <Button onClick={() => props.onConfirm(propsList)}>Confirm</Button>
        </Modal>
    )
}

export default PropConfig

