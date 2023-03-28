import SendAccessRequestButton from "./SendAccessRequestButton";
import React from "react";
import {
    createSemesterAccessRequestMutation,
    CreateSemesterAccessRequestMutation,
    Semester,
    SemesterAccessRequest, SemesterAccessRequestVariables
} from "../../../../lib/graphql/courseQuery";
import {useMutation, useQuery} from "@apollo/client";
import {showErrorToast, showSuccessToast} from "../../../../components/editor/helpers";
import {useTranslation} from "react-i18next";
import {
    getSemesterAccessRequests,
    GetSemesterAccessRequestsQuery,
    GetSemesterAccessRequestsVariables
} from "../../../../lib/graphql/accessRequestQuery";
import Loading from "../../../../components/loading/Loading";

interface Props {
    semester: Semester
}

const CourseAccessRequest = ({semester}: Props) => {
    const {t} = useTranslation();

    const [sendAccessRequest, {loading}] = useMutation<CreateSemesterAccessRequestMutation, SemesterAccessRequestVariables>(createSemesterAccessRequestMutation, {
        onError: (error) => {
            showErrorToast(error);
        },
        onCompleted: () => {
            showSuccessToast(t('course.semester.available.access.message.send'));
        },
    });

    const {data, loading: loadingRequest} = useQuery<GetSemesterAccessRequestsQuery, GetSemesterAccessRequestsVariables>(getSemesterAccessRequests, {
        variables: {
            semesterId: semester.id
        },
        onError: (error) => {
            showErrorToast(error);
        },
    });

    const [request, setRequest] = React.useState<SemesterAccessRequest | undefined | null>(data?.semesterAccessRequestsAppUser);

    const sendAccessRequestHandle = async (semester: Semester) => {
        if (!loading) {
            const semesterId = semester.id;

            const result = await sendAccessRequest({variables: {semesterId}});
            setRequest(result.data?.createSemesterAccessRequest);
        }
    }

    return <div className="flex flex-col justify-center items-center align-middle">
        {(!loading && !request) && <SendAccessRequestButton semester={semester} onClick={sendAccessRequestHandle}/>}
        {(loadingRequest || request) && <Loading />}
    </div>
}

export default CourseAccessRequest;