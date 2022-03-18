import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Input, Button, Select } from 'antd'
import { Switch, Modal } from 'antd';
import { selectUnstyledClasses } from '@mui/base';
import { Trash, Plus } from 'react-feather';
const { Option } = Select;

interface Prop {
    onConfirm: any,
}

interface AddPropsProp {
    onChange: any
}
const propTypesKeys = Object.keys(PropTypes)
const typesList = propTypesKeys.filter(key => {
    if (PropTypes[key].name === 'bound checkType')
        return true
    return false
})

typesList.push('any')

// form initial state
const initialForm = {
    propName: '',
    propType: 'any',
    required: false
}

const PropConfig = (props: Prop) => {
    const [visible, setVisible] = useState(false);

    const [propsList, setPropsList] = useState([])
    const [form, setForm] = useState(initialForm)

    const handleChange = (e) => {
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
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h2>Component props</h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {propsList.length === 0 && (
                    <span style={{ paddingRight: "32px" }}>You have not set any prop yet.</span>
                )}

                <Button onClick={() => setVisible(true)} >Add/Edit props</Button>
            </div>
            {propsList.length != 0 && (
                        <div className='props-config-table'>
                        <table style={{ width: '70%', margin: '20px 0' }}>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Required</th>
                            </tr>
                            {propsList.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.propName}</td>
                                        <td>{item.propType}</td>
                                        <td>{item.required}</td>
                                    </tr>
                                )
                            })}
                        </table>
                        </div>
                    )}

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
                        <Input value={form.propName} onChange={e => handleChange({ propName: e.target.value })} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor="name">Name</label>
                        <Select defaultValue={form.propType} onChange={e => handleChange({ propType: e })} style={{ width: 120 }}>
                            {typesList.map(item => {
                                return (
                                    <Option value={item}>{item}</Option>
                                )
                            })}
                        </Select>

                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label>required:</label>
                        <Switch defaultChecked onChange={e => handleChange({ required: e })} />
                    </div>
                    <Button onClick={handleAddProp}>Add</Button>
                </div>
                    {  propsList.length != 0 && (
                        <div>
                        <table style={{ width: '70%', margin: '20px 0' }}>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Required</th>
                            </tr>
                            {propsList.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.propName}</td>
                                        <td>{item.propType}</td>
                                        <td>{item.required}</td>
                                        <td><Trash onClick={() => handleDelete(index)} /></td>
                                    </tr>
                                )
                            })}
                        </table>
                        </div>
                    )}
                <Button onClick={() => props.onConfirm(propsList)}>Save</Button>
                <Button onClick={() => setVisible(false)}>Cancel</Button>
            </Modal>
        </>
    )
}

export default PropConfig

