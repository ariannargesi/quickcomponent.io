import { nanoid } from "nanoid"
import { ComponentMember } from "./types"

const map: ComponentMember[] = [
    {
        title: "div",
        props: {
            className: "container",
            style: {
                width: "500px",
                height: "500px",
                background: "rgba(255, 255, 255, 1)",
                borderRadius: "64px",
                boxShadow:
                    "2px                                                               2px 43px               0px                                                               rgba(128,154,145, 0.5)",
                padding: "42px",
                textAlign: "left",
            },
        },
        key: nanoid(),
        children: [
         
        ],
    },
]
export default map
