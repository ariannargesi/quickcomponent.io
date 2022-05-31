import { useState } from 'react'
import { Text } from "../../Styled"
import { Trash } from "react-feather"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../types'
import { deleteProp } from '../../../redux/slice/app'
import styled from 'styled-components'
import { fontFamily } from '../../Styled'

const Table = styled.table`
    border: 1px solid red;
    height: 50%;
    width: 100%;
    font-family: ${fontFamily};
    th {
        text-align: left;
       
    }
`

const PropsList = (props) => {
    const dispatch = useDispatch()
    const propsList = useSelector((state: RootState) => state.config.propsList)

    const handleDeleteProp = (index: number) => {
        dispatch(deleteProp({index}))
    }

    return (
        <div style={{overflow: 'scroll', height: '200px'}}>
        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Required</th>
                </tr>
            </thead>
            <tbody>
                {propsList.map((item, index) => {
                    return (
                        <tr key={item.name}>
                            <td>{item.name}</td>
                            <td>{item.type}</td>
                            <td>{item.required ? "True" : "False"}</td>
                            <td>
                                <Trash
                                    onClick={() => handleDeleteProp(index)}
                                />
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        </div>
    )
}

export default PropsList 
