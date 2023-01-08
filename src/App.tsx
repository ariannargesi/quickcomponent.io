import { Suspense, lazy } from 'react'
import { useMediaQuery } from 'react-responsive'
const Application = lazy(() => import('./component/ApplicationRouter'))
const MobileMessage = lazy(() => import('./component/MobileMessage'))

const App = () => {

    const isBigEnough = useMediaQuery({
        query: "(min-width: 768px)",
    })

    return (
        <Suspense fallback='Loading...'>
            {isBigEnough ? <Application/> : <MobileMessage/>}
        </Suspense>
    )
}

export default App 