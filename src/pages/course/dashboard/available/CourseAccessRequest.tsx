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
    getSemesterAccessRequestsAppUser,
    GetSemesterAccessRequestsAppUserQuery,
    GetSemesterAccessRequestsAppUserVariables
} from "../../../../lib/graphql/accessRequestQuery";
import Loading from "../../../../components/loading/Loading";

interface Props {
    semester: Semester,

    onRequestSent?: (request: SemesterAccessRequest) => void | Promise<void>
}

const CourseAccessRequest = ({
                                 semester, onRequestSent = () => {
    }
                             }: Props) => {
    const {t} = useTranslation();

    const [sendAccessRequest, {
        loading,
        data: mutationData
    }] = useMutation<CreateSemesterAccessRequestMutation, SemesterAccessRequestVariables>(createSemesterAccessRequestMutation, {
        onError: (error) => {
            showErrorToast(t('course.semester.available.access.message.error'));
        },
        onCompleted: () => {
            showSuccessToast(t('course.semester.available.access.message.send'));
        },
    });

    const {
        data: queryData,
        loading: loadingRequest
    } = useQuery<GetSemesterAccessRequestsAppUserQuery, GetSemesterAccessRequestsAppUserVariables>(getSemesterAccessRequestsAppUser, {
        variables: {
            semesterId: semester.id
        },
        onCompleted: (data) => {
            if (data.semesterAccessRequestsAppUser) {
                onRequestSent(data.semesterAccessRequestsAppUser)
            }
        },
        onError: (error) => {
            showErrorToast(t('course.semester.available.access.message.error'));
        },
    });

    const sendAccessRequestHandle = async (semester: Semester) => {
        if (!loading) {
            const semesterId = semester.id;

            const result = await sendAccessRequest({variables: {semesterId}});
            if (result.data) {
                onRequestSent(result.data.createSemesterAccessRequest);
            }
        }
    }

    const showLoading = () =>
        loadingRequest || loading || mutationData?.createSemesterAccessRequest || queryData?.semesterAccessRequestsAppUser;

    return <div className="flex flex-col justify-center items-center align-middle">
        {showLoading() ?
            <Loading/> :
            <SendAccessRequestButton semester={semester} onClick={sendAccessRequestHandle}/>
        }
    </div>
}

export default CourseAccessRequest;