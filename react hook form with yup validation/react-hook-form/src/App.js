import React from 'react'
import { Routes, Route} from "react-router-dom";
import First from './pages/first';
import Navigation from './component/navigation'

const App = () => {
    return (
        <div>
            <>
                <Navigation/>
                <Routes>
                    <Route path="/" element={<First />} />
                    {/* <Route path="/react-hook-form" element={<ReactHookForm />} /> */}

                </Routes>
            </>
        </div>
    )
}

export default App

