import './index.css'
import {Route, Routes} from 'react-router-dom'
import CourseDashboard from "./pages/CourseDashboard";
import ProtectedRoute from "./features/authentication/component/ProtectedRoute";
import CourseSemesterDetail from "./pages/CourseSemesterDetail";
import Login from "./pages/Login";
import UnauthenticatedRoute from "./features/authentication/component/UnauthenticatedRoute";
import ChallengeDetail from "./pages/ChallengeDetail";
import ChallengeEditor from "./components/course/ui/challenge/ChallengeEditor";
import Header from "./components/Header";
import {useAppSelector} from "./features/authentication/hooks/hooks";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const authenticationInfo = useAppSelector((state) => state.authentication);

    return (
        <div className="w-full flex flex-col flex-wrap ">
            {authenticationInfo?.jwtInfo?.token && <Header />}
            <ToastContainer />
            <main className="flex lg:m-0 flex-row w-full sm:w-full justify-center">
                <div className="w-full lg:w-256 ">
                    <Routes>
                        <Route path="/login" element={<UnauthenticatedRoute redirectUrl={"/dashboard"}><Login /></UnauthenticatedRoute>} />
                        <Route path="/dashboard" element={<ProtectedRoute><CourseDashboard/></ProtectedRoute>} />
                        <Route path="/courses/:courseId/semester/:semesterId" element={<ProtectedRoute><CourseSemesterDetail/></ProtectedRoute>}>
                            <Route path="challenge/:challengeId" element={<ChallengeDetail />} />
                            <Route path="challenge/create" element={<ChallengeEditor />} />
                            <Route path="challenge/:challengeId/edit" element={<ChallengeEditor />} />
                        </Route>
                    </Routes>
                </div>
            </main>
        </div>
    )
}

export default App
