import './index.css'
import {Route, Routes} from 'react-router-dom'
import CourseDashboard from "./pages/CourseDashboard";
import ProtectedRoute from "./features/authentication/component/ProtectedRoute";
import CourseSemesterDetail from "./components/course/CourseSemesterDetail";
import Login from "./pages/Login";
import UnauthenticatedRoute from "./features/authentication/component/UnauthenticatedRoute";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<UnauthenticatedRoute redirectUrl={"/dashboard"}><Login /></UnauthenticatedRoute>}/>
            <Route path="/dashboard" element={<ProtectedRoute><CourseDashboard/></ProtectedRoute>}/>
            <Route path="/courses/:courseId/semester/:semesterId" element={<ProtectedRoute><CourseSemesterDetail/></ProtectedRoute>}/>
        </Routes>
    )
}

export default App
