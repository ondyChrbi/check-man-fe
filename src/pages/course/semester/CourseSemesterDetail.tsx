import {useOutlet, useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import ChallengeAside from "../../../components/course/ui/challenge/ChallengeAside";
import LoadingSpinner from "../../../components/LoadingSpinner";
import React from "react";
import {courseQuery, SemesterQuery, SemesterRole} from "../../../lib/graphql/courseQuery";
import SemesterAdministratorToolbar from "../../../components/course/ui/SemesterAdministratorToolbar";
import {useAppDispatch} from "../../../features/storage/hooks";
import {addRoles} from "../../../features/storage/storageSlice";
import CourseSemesterRequirements from "../../../components/course/CourseSemesterRequirements";
import {useCourseRoles} from "../../../features/authorization/hooks";
import CourseStatistics from "../../../components/course/statistics/CourseStatistics";

const CourseSemesterDetail = () => {
    const {courseId, semesterId, challengeId} = useParams<'courseId' | 'semesterId' | 'challengeId' | 'testResultId'>();
    const outlet = useOutlet();
    const dispatch = useAppDispatch();

    const {roles} = useCourseRoles(semesterId!!);

    const {data, loading, error} = useQuery<SemesterQuery>(courseQuery, {
        variables: {"id": semesterId},
        onCompleted: ({courseRoles: roles}) => {
            if (courseId) {
                dispatch(addRoles({semesterId: courseId, roles}));
            }
        },
    });

    if (loading) {
        return <div className="w-full h-full flex flex-row items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    if (error || !semesterId || !courseId) return <>Error</>

    return <div className="w-full flex flex-col justify-center items-center align-middle">
        <div className="w-full lg:w-256 h-full flex flex-row">
            <ChallengeAside semesterId={semesterId} courseId={courseId} open={false} />
            <section className="w-full my-2 pl-10 pr-1 lg:m-0 lg:my-0 lg:m-10 lg:m-8">
                <div className="my-5 w-full md:h-14 flex flex-col items-end justify-center align-middle">
                    <SemesterAdministratorToolbar courseId={courseId} semesterId={semesterId}
                                                  challengeId={challengeId}/>
                </div>
                {!outlet && data?.semester &&
                    <div className="w-full h-fit flex flex-col">
                        <CourseSemesterRequirements requirements={data?.semester?.fulfillmentConditions}
                                                    editable={roles.includes(SemesterRole.EDIT_COURSE)}
                                                    semester={data.semester} />
                        {roles.includes(SemesterRole.VIEW_STATISTICS) && <CourseStatistics semesterId={semesterId} />}
                    </div>
                }
                {outlet}
            </section>
        </div>
    </div>
}

export default CourseSemesterDetail;