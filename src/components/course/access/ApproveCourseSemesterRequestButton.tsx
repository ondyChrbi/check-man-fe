import {useTranslation} from "react-i18next";
import {HandThumbUpIcon} from "@heroicons/react/24/solid";
import {
    approveCourseSemesterRequest,
    ApproveCourseSemesterRequestMutation, ApproveCourseSemesterRequestVariables, getSemesterAccessRequests
} from "../../../lib/graphql/accessRequestQuery";
import {useMutation} from "@apollo/client";
import {SemesterRole} from "../../../lib/graphql/courseQuery";
import {showErrorToast, showSuccessToast} from "../../editor/helpers";
import React from "react";

interface Props {
    id: string;
    semesterId: string | number;
    roles: Array<SemesterRole>
    title?: string;
    icon?: JSX.Element;
    bgColor?: string;
}

const DEFAULT_ICON = <HandThumbUpIcon width={20} height={20} color="#000000" />

const ApproveCourseSemesterRequestButton = ({id, semesterId, roles = [SemesterRole.ACCESS], bgColor = "bg-teal-500", title = "Approve", icon = DEFAULT_ICON}: Props) => {
    const {t} = useTranslation();

    const [approveCourseSemester, {loading}] = useMutation<ApproveCourseSemesterRequestMutation, ApproveCourseSemesterRequestVariables>(approveCourseSemesterRequest, {
        onError: (error) => {
            showErrorToast(error);
        },
        onCompleted: () => {
            showSuccessToast(t('common.message.add'));
        },
        refetchQueries: [{ query: getSemesterAccessRequests, variables: { semesterId } }],
        variables: {id, roles},
    });

    const clickHandle = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!loading) {
            await approveCourseSemester();
        }
    };

    return <div className="flex justify-center space-x-2">
            <button
                type="button"
                onClick={clickHandle}
                data-te-ripple-init="true"
                data-te-ripple-color="light"
                className={`flex items-center rounded w-44 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out ${bgColor}`}>
                {icon}
                <div className="flex flex-col ml-1.5">
                    {title}
                </div>
            </button>
    </div>
};

export default ApproveCourseSemesterRequestButton;