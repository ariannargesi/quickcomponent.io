import { useSelector, useDispatch } from "react-redux"
import { Drawer as AntDrawer, List } from "antd"
import { addNodeInTree } from "../../redux/slice/app"
import elementsList from "../../data/html-elements"
import useToggleDrawer from "../../hooks/useToggleDrawer"
import { RootState, HtmlElement } from "../../types"
import { genereateElement } from "../../helper"

const Drawer = () => {
    const dispatch = useDispatch()
    const toggleDrawer = useToggleDrawer()
    const { visible, empty } = useSelector((state: RootState) => {
        return {
            visible: state.openDrawer,
            empty: state.emptyTree,
        }
    })

    const handleAddingChild = (name) => {
        dispatch(
            addNodeInTree({
                element: genereateElement(name, dispatch),
            })
        )
        toggleDrawer()
    }

    return (
        <AntDrawer
            title="Elements List"
            placement="left"
            closable={true}
            visible={visible}
            onClose={() => toggleDrawer()}
        >
            <List
                dataSource={
                    empty
                        ? elementsList.filter(
                              (element) => element.tag != "text"
                          )
                        : elementsList
                }
                renderItem={(item: HtmlElement) => (
                    <List.Item onClick={() => handleAddingChild(item.tag)}>
                        {item.tag}
                    </List.Item>
                )}
            />
        </AntDrawer>
    )
}

export default Drawer
