import './index.css'
import {Route, Routes} from 'react-router-dom'
import CourseDashboard from "./pages/course/CourseDashboard";
import ProtectedRoute from "./features/authentication/component/ProtectedRoute";
import CourseSemesterDetail from "./pages/course/CourseSemesterDetail";
import Login from "./pages/Login";
import UnauthenticatedRoute from "./features/authentication/component/UnauthenticatedRoute";
import ChallengeDetail from "./pages/course/challenge/ChallengeDetail";
import ChallengeEditor from "./components/course/ui/challenge/ChallengeEditor";
import Header from "./components/Header";
import {useAppSelector} from "./features/storage/hooks";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SolutionsToReview from "./pages/course/challenge/SolutionsToReview";
import ReviewEditor from "./pages/course/challenge/ReviewEditor";
import CourseUsersManager from "./pages/course/CourseUsersManager";
import CourseUserDetail from "./pages/course/CourseUserDetail";
import AuthorizedRoute from "./features/authentication/component/AuthorizedRoute";
import {SemesterRole} from "./lib/graphql/courseQuery";
import Error from "./pages/Error";

function App() {
    const authenticationInfo = useAppSelector((state) => state.storage.authentication);
    
    return (
        <div className="w-full flex flex-col flex-wrap">
            {authenticationInfo?.jwtInfo?.token && <Header />}
            <ToastContainer />
            <main className="flex lg:m-0 flex-row w-full sm:w-full justify-center">
                <div className="w-full lg:w-256 ">
                    <Routes>
                        <Route path="/" element={<ProtectedRoute><CourseDashboard/></ProtectedRoute>} />
                        <Route path="/login" element={<UnauthenticatedRoute redirectUrl={"/dashboard"}><Login /></UnauthenticatedRoute>} />
                        <Route path="/error" element={<Error />} />
                        <Route path="/dashboard" element={<ProtectedRoute><CourseDashboard/></ProtectedRoute>} />
                        <Route path="/courses/:courseId/semester/:semesterId" element={<ProtectedRoute><CourseSemesterDetail/></ProtectedRoute>}>
                            <Route path="users" element={
                                <AuthorizedRoute mandatoryRoles={[SemesterRole.MANAGE_USERS]}>
                                    <CourseUsersManager />
                                </AuthorizedRoute>
                            }/>
                            <Route path="users/:userId" element={
                                <AuthorizedRoute mandatoryRoles={[SemesterRole.MANAGE_USERS]}>
                                    <CourseUserDetail />
                                </AuthorizedRoute>
                            }/>
                            <Route path="challenge/:challengeId" element={<ChallengeDetail />} />
                            <Route path="challenge/create" element={
                                <AuthorizedRoute mandatoryRoles={[SemesterRole.CREATE_CHALLENGE]}>
                                    <ChallengeEditor />
                                </AuthorizedRoute>
                            } />
                            <Route path="challenge/:challengeId/edit" element={
                                <AuthorizedRoute mandatoryRoles={[SemesterRole.EDIT_CHALLENGE]}>
                                    <ChallengeEditor />
                                </AuthorizedRoute>
                            } />
                            <Route path="challenge/:challengeId/review" element={
                                <AuthorizedRoute mandatoryRoles={[SemesterRole.REVIEW_CHALLENGE]}>
                                    <SolutionsToReview/>
                                </AuthorizedRoute>
                            } />
                            <Route path="challenge/:challengeId/solution/:solutionId" element={
                                <AuthorizedRoute mandatoryRoles={[SemesterRole.REVIEW_CHALLENGE]}>
                                    <ReviewEditor />
                                </AuthorizedRoute>
                            } />
                        </Route>
                    </Routes>
                </div>
            </main>
        </div>
    )
}

export default App
