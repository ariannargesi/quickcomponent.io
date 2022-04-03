import React, { useState } from 'react'
import { Input, Button, Select } from 'antd'
import { Switch, Modal } from 'antd';
import { useSelector } from 'react-redux'
import { Trash } from 'react-feather';
import { RootState } from '../../redux'
import { ScriptFormats } from '../../helper/codeGenerators';
import styles from './styles.module.sass'
const { Option } = Select;

let propTypes_types = [
    'array', 'bigint', 'bool', 'fun', 'number', 'object', 'string', 'symbol', 'node', 'element', 'elementType', 'any'
]

let tsx_types = [
    'string', 'number', 'boolean', 'string[]', 'number[]', 'boolean[]', 'object', 'Function', 'ReactNode'
]

interface Prop {
    onConfirm: any,
}

// form initial state
const initialForm = {
    propName: '',
    propType: 'any',
    required: false
}

const PropConfig = (props: Prop) => {

    const [modalVisible, setModalVisible] = useState(false);
    const config = useSelector((state: RootState) => state.app.config)
    // using statePropsList to show props list outside of the modal 
    const { propsList: statePropsList, scriptType } = config
    // using this state to show props list insdie the modal 
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

    const typesList = scriptType === ScriptFormats.TS ? tsx_types : propTypes_types

    const handleAddProp = () => {
        setPropsList(prev => [...prev, form])
        setForm(initialForm)
    }

    const handleDeleteProp = (index) => {
        setPropsList(propsList => {
            return propsList.filter((item, index2) => index != index2)
        })
    }

    return (
        <>
            <h2>Component props</h2>
            {statePropsList.length === 0 && (
                <span>You have not set any prop yet. </span>
            )}
            <Button onClick={() => setModalVisible(true)} >Add/Delete props</Button>
            {statePropsList.length != 0 && (
                <div style={{ textAlign: 'left' }}>
                    <table className={styles.table} style={{width: '70%'}}>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Required</th>
                        </tr>
                        {propsList.map((item) => {
                            return (
                                <tr>
                                    <td>{item.propName}</td>
                                    <td>{item.propType}</td>
                                    <td>{item.required ? 'True' : 'False'}</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            )}

            <Modal
                title="Config props"
                centered
                visible={modalVisible}
                onOk={() => setModalVisible(false)}
                footer={false}
                onCancel={() => setModalVisible(false)}
                width={600}

            >
                <div className={styles.formContainer}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <Input value={form.propName} onChange={e => handleChange({ propName: e.target.value })} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor="name">Name</label>
                        <Select
                            defaultValue={form.propType}
                            onChange={e => handleChange({ propType: e })}
                            style={{ width: 120 }}
                        >
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
                {propsList.length != 0 && (
                    <table className={styles.table}>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Required</th>
                        </tr>
                        <tbody>
                            {propsList.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.propName}</td>
                                        <td>{item.propType}</td>
                                        <td>{item.required ? 'True' : 'False'}</td>
                                        <td><Trash onClick={() => handleDeleteProp(index)} /></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )}
                <Button
                    block
                    type='primary'
                    onClick={() => {
                        props.onConfirm(propsList)
                        setModalVisible(false)
                    }}
                    style={{ marginTop: '16px' }}
                >
                    Done
                </Button>
            </Modal>
        </>
    )
}

export default PropConfig

