import { nanoid } from "nanoid"
import { ComponentMember } from "./types"

const map: ComponentMember[] = [
    {
        title: "div",
        props: {
            className: "container",
            style: {
                width: "100%",
                height: "100%",
                background: "rgba(255, 255, 255, 1)",
                borderRadius: "0px",
                boxShadow: "2px 2px 43px 0px rgba(128,154,145, 0.5)",
                padding: "42px",
                textAlign: "left",
            },
        },
        key: nanoid(),
        children: [
            {
                title: "h1",
                props: {
                    className: "h1__8O-o2",
                    style: {
                        fontWeight: 700,
                    },
                },
                key: nanoid(),
                text: "Welcome to quickcomponent.io",
            },
            {
                title: "h3",
                props: {},
                key: nanoid(),
                text: "- Try changing the styles ",
            },
            {
                title: "h3",
                props: {},
                key: nanoid(),
                text: "- Add or remove elements ",
            },
            {
                title: "h3",
                props: {},
                key: nanoid(),
                text: "- Click export button to see your ",
            },
            {
                title: "h3",
                props: {},
                key: nanoid(),
                text: "- copy or download your code with your custom settings",
            },
            {
                title: "div",
                props: {
                    className: "div_6Hy3cW",
                    style: {
                        textAlign: "center",
                    },
                },
                key: nanoid(),
                children: [
                    {
                        title: "button",
                        props: {
                            className: "button_B-tI26",
                            style: {
                                backgroundColor: "rgba(0, 0, 0, 0.2)",
                                fontSize: "1.2rem",
                                width: "100%",
                                padding: "8px",
                            },
                        },
                        key: nanoid(),
                        children: [
                            {
                                text: "Button",
                                key: nanoid(),
                            },
                        ],
                    },
                ],
            },
        ],
    },
]
export default map
