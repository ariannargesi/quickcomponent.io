import { nanoid } from "nanoid"
import { ComponentMember } from "./types"

const map: ComponentMember[] = [
    {
        title: "div",
        props: {
            className: "container",
            style: {
                width: "500px",
                height: "400px",
                background: "rgba(255, 255, 255, 1)",
                borderRadius: "64px",
                boxShadow: "2px 2px 43px 0px #999999",
                padding: "42px",
                textAlign: "left",
                position: "relative"
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
                title: "button",
                props: {
                    className: "button_B-tI26",
                    style: {
                        backgroundColor: "#64ff4f",
                        fontSize: "24px",
                        width: "149px",
                        padding: "8px",
                        borderRadius: "30px",
                        margin: "65px 0px 0px 0px",
                    },
                },
                key: nanoid(),
                children: [
                    {
                        title: 'text',
                        text: "Button",
                        key: nanoid(),
                    },
                ],
            },
        ],
    },
]
export default map
