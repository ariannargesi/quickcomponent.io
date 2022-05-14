import { Checkbox } from "antd"
import { useNavigate } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { ChevronLeft } from "react-feather"
import Radio from "../Radio"
import { updateConfig } from "../../redux/slice/app"
import { RootState } from "../../types"
import Box from "./Box"
import { ScriptFormats, StyleFormats } from "../../types"
import PropConfig from "../PropConfig"
import styles from "./styles.module.sass"

const CheckboxGroup = Checkbox.Group

const hooksList = ["useState", "useEffect", "useRef", "useCallback", "useMemo"]

const CompnentConfig = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const config = useSelector((state: RootState) => state.config)

    const goBack = () => {
        navigate(-1)
    }

    const handleChange = (key, value) => {
        dispatch(
            updateConfig({
                key,
                value,
            })
        )
    }

    const handleHooksListChange = (list) => {
        dispatch(handleChange("hooksList", list))
    }

    return (
        <div className={styles.container}>
            <ChevronLeft onClick={goBack} />
            <PropConfig
                onConfirm={(value) => {
                    handleChange("propsList", value)
                }}
            />
            <Box title="Do you need a test file?">
                <Radio
                    type="gray"
                    options={["Yes", "No"]}
                    onChange={(e) => {
                        handleChange(
                            "usingTestFile",
                            e === "Yes" ? true : false
                        )
                    }}
                    activeItem={config.usingTestFile === true ? "Yes" : "No"}
                />
            </Box>
            <Box title="Do you use typescript for your scripts?">
                <Radio
                    type="gray"
                    options={["Yes", "No, I'm using javascript"]}
                    onChange={(e) => {
                        handleChange(
                            "scriptType",
                            e === "Yes" ? ScriptFormats.TS : ScriptFormats.JS
                        )
                    }}
                    activeItem={
                        config.scriptType === ScriptFormats.TS
                            ? "Yes"
                            : "No, I'm using javascript"
                    }
                />
            </Box>
            <Box title="Do you use SASS for your styles?">
                <Radio
                    type="gray"
                    options={["Yes", "No, I'm using CSS"]}
                    onChange={(e) => {
                        handleChange(
                            "styleType",
                            e === "Yes" ? StyleFormats.SASS : StyleFormats.CSS
                        )
                    }}
                    activeItem={
                        config.styleType === StyleFormats.SASS
                            ? "Yes"
                            : "No, I'm using CSS"
                    }
                />
            </Box>
            <Box title="Do you like props distruction?">
                <Radio
                    type="gray"
                    options={["Yes", "No"]}
                    onChange={(e) => {
                        handleChange(
                            "propDisctruction",
                            e === "Yes" ? true : false
                        )
                    }}
                    activeItem={config.propDisctruction === true ? "Yes" : "No"}
                />
            </Box>
            <Box title="Select your hooks (import statment)">
                <CheckboxGroup
                    options={hooksList}
                    value={config.hooksList}
                    onChange={handleHooksListChange}
                />
            </Box>
        </div>
    )
}

export default CompnentConfig
