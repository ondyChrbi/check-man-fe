import './index.css'
import {Route, Routes} from 'react-router-dom'
import LoginComponent from './component/LoginComponent'

function App() {
    return (
        <div>
            <header>
            </header>
            <section>
                <Routes>
                    <Route path="/login" element={<LoginComponent />} />
                </Routes>
            </section>
        </div>
    )
}

export default App
