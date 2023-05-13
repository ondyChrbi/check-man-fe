import './index.css'
import {Route, Routes} from 'react-router-dom'
import CourseDashboard from "./pages/course/dashboard/CourseDashboard";
import ProtectedRoute from "./features/authentication/component/ProtectedRoute";
import CourseSemesterDetail from "./pages/course/semester/CourseSemesterDetail";
import Login from "./pages/Login";
import UnauthenticatedRoute from "./features/authentication/component/UnauthenticatedRoute";
import ChallengeDetail from "./pages/course/challenge/ChallengeDetail";
import ChallengeEditor from "./components/course/ui/challenge/ChallengeEditor";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SolutionsToReview from "./pages/course/challenge/review/SolutionsToReview";
import ReviewEditor from "./pages/course/challenge/review/editor/ReviewEditor";
import CourseUsersManager from "./pages/course/CourseUsersManager";
import CourseUserDetail from "./pages/course/CourseUserDetail";
import AuthorizedRoute from "./features/authentication/component/AuthorizedRoute";
import {SemesterRole} from "./lib/graphql/courseQuery";
import Error from "./pages/Error";
import CourseEditor from "./pages/course/CourseEditor";
import CourseDetail from "./pages/course/CourseDetail";
import SemesterEditor from "./pages/course/semester/SemesterEditor";
import TestResultDetail from "./components/course/ui/challenge/solution/test/TestResultDetail";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import CourseAccessManager from "./pages/course/semester/CourseAccessManager";
import ReviewDetail from "./pages/course/challenge/review/ReviewDetail";
import ChallengeAccessEditor from "./pages/course/challenge/access/ChallengeAccessEditor";
import ChallengeSummary from "./pages/course/challenge/ChallengeSummary";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function App() {
    return (
        <div className="w-full flex flex-col h-full bg-bing">
            <ToastContainer />
            <main className="flex lg:m-0 flex-row w-full sm:w-full justify-center h-full">
                <div className="w-full h-full">
                    <Routes>
                        <Route path="/login" element={<UnauthenticatedRoute redirectUrl={"/dashboard"}><Login /></UnauthenticatedRoute>} />
                        <Route path="/" element={<ProtectedRoute><CourseDashboard/></ProtectedRoute>} />
                        <Route path="/error" element={<Error />} />
                        <Route path="/dashboard" element={<ProtectedRoute><CourseDashboard/></ProtectedRoute>} />
                        <Route path="/courses/add" element={<ProtectedRoute><CourseEditor /></ProtectedRoute>} />
                        <Route path="/courses/:courseId" element={<CourseDetail />} />
                        <Route path="/courses/:courseId/semester/add" element={<SemesterEditor />} />
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
                            <Route path="challenge/:challengeId/solution/:solutionId/review/:reviewId/edit" element={
                                <AuthorizedRoute mandatoryRoles={[SemesterRole.REVIEW_CHALLENGE]}>
                                    <ReviewEditor />
                                </AuthorizedRoute>
                            } />
                            <Route path="test-result/:testResultId" element={
                                <AuthorizedRoute mandatoryRoles={[SemesterRole.VIEW_TEST_RESULT]}>
                                    <TestResultDetail />
                                </AuthorizedRoute>
                            } />
                            <Route path="access-requests" element={
                                <AuthorizedRoute mandatoryRoles={[SemesterRole.MANAGE_USERS]}>
                                    <CourseAccessManager />
                                </AuthorizedRoute>
                            } />
                            <Route path="challenge/:challengeId/summary" element={
                                <AuthorizedRoute mandatoryRoles={[SemesterRole.VIEW_STATISTICS]}>
                                    <ChallengeSummary />
                                </AuthorizedRoute>
                            } />
                            <Route path="challenge/:challengeId/solution/:solutionId/review/:reviewId" element={
                                <ReviewDetail  />
                            } />
                            <Route path="challenge/:challengeId/access-requests" element={
                                <ChallengeAccessEditor  />
                            } />
                        </Route>
                    </Routes>
                </div>
            </main>
        </div>
    )
}

export default App
