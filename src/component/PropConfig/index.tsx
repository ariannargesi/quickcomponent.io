import React from 'react'
import { Input, Button } from 'antd'
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

    const confirm = () => {
        props.onChange({
            name, type, defaultValue
        })
    }

    return (
        <div style={{ display: 'flex' }}>
            <div>
                <label htmlFor="name">Name</label>
                <Input onChange={e => name = e.target.value} />
            </div>
            <div>
                <label htmlFor="type">Type?(optional)</label>
                <Input onChange={e => type = e.target.value} />
            </div>
            <div>
                <label htmlFor="defaultValue">Default value?(optional)</label>
                <Input onChange={e => defaultValue = e.target.value} />
            </div>
            <Button onClick={confirm}>Okay</Button>
        </div>
    )
}

const PropConfig = (props: Prop) => {
    return (
        <div>
            <h1>Prop config</h1>
        </div>
    )
}

export default PropConfig 