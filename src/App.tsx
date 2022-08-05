import './index.css'
import {Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import CourseDashboard from "./pages/CourseDashboard";
import ProtectedRoute from "./features/authentication/component/ProtectedRoute";
import CourseSemesterDetail from "./components/CourseSemesterDetail";

function App() {
    return (
        <div>
            <header>
            </header>
            <main>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <CourseDashboard/>
                        </ProtectedRoute>
                    }
                    />
                    <Route path="/semester/:semesterId" element={<CourseSemesterDetail/>}/>
                </Routes>
            </main>
        </div>
    )
}

export default App
