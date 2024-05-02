import React, { Suspense } from "react"
import "../../styles.sass"

import store from "../../redux"
import { Provider } from "react-redux"
import { HashRouter, Route, Routes } from "react-router-dom"

const MainEditor = React.lazy(() => import("../MainEditor"))
const Export = React.lazy(() => import("../Export"))

const App = () => {
    return (
        <Suspense fallback="Loading">
            <Provider store={store}>
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<MainEditor />} />
                        <Route path="/export" element={<Export />} />
                    </Routes>
                </HashRouter>
            </Provider>
        </Suspense>
    )
}

export default App
