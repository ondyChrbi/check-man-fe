import './index.css'
import {Route, Routes} from 'react-router-dom'
import CourseDashboard from "./pages/CourseDashboard";
import ProtectedRoute from "./features/authentication/component/ProtectedRoute";
import CourseSemesterDetail from "./pages/CourseSemesterDetail";
import Login from "./pages/Login";
import UnauthenticatedRoute from "./features/authentication/component/UnauthenticatedRoute";
import ChallengeDetail from "./pages/ChallengeDetail";
import ChallengeEditor from "./components/course/ChallengeEditor";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<UnauthenticatedRoute redirectUrl={"/dashboard"}><Login /></UnauthenticatedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><CourseDashboard/></ProtectedRoute>} />
            <Route path="/courses/:courseId/semester/:semesterId" element={<ProtectedRoute><CourseSemesterDetail/></ProtectedRoute>}>
                <Route path="challenge/:challengeId" element={<ChallengeDetail />} />
                <Route path="challenge/create" element={<ChallengeEditor />} />
            </Route>
        </Routes>
    )
}

export default App
