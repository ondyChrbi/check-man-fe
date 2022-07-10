import './index.css'
import {Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import AvailableCourses from "./pages/AvailableCourses";
import ProtectedRoute from "./features/authentication/component/ProtectedRoute";

function App() {
    return (
        <div>
            <header>
            </header>
            <section>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/courses" element={
                        <ProtectedRoute>
                            <AvailableCourses/>
                        </ProtectedRoute>
                    }
                    />
                </Routes>
            </section>
        </div>
    )
}

export default App
