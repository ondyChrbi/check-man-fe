import {Requirement} from "../../../../../lib/graphql/requirementQuery";
import {useTranslation} from "react-i18next";
import {useRequirements} from "../../../../../features/hooks/challenge";
import React from "react";
import {showErrorToast, showSuccessToast} from "../../../../editor/helpers";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/solid";
import {useCourseRoles} from "../../../../../features/authorization/hooks";
import {SemesterRole} from "../../../../../lib/graphql/courseQuery";

const ICON_WIDTH = 30;
const ICON_HEIGHT = 30;

interface Props {
    requirement: Requirement,
    challengeId: string | number,
    semesterId: string | number,
    onEditRequirementClick?: (requirement: Requirement) => void | undefined | Promise<void | undefined>,
    editable?: boolean | undefined | null,
}

const RequirementCard = ({ requirement, challengeId, semesterId, onEditRequirementClick, editable = false }: Props) => {
    const {t} = useTranslation();
    const {removeRequirement} = useRequirements({challengeId});

    const {roles} = useCourseRoles(semesterId);

    const removeClickHandle = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        try {
            await removeRequirement({variables: {requirementId: requirement.id}});
            showSuccessToast(t('common.message.remove'));
        } catch (e) {
            showErrorToast(e);
        }
    };

    const editClickHandle = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if (onEditRequirementClick) {
            await onEditRequirementClick(requirement);
        }
    };

    return <div className="my-5 flex flex-row justify-start items-center w-96">
        <div
            className="w-24 h-24 flex flex-row justify-center items-center text-teal-600 border-teal-600 border-8 rounded-full text-2xl mr-5">
            <div className="text-gray-400">{requirement.minPoint}</div>
            <div className="text-gray-400">/</div>
            <div>{requirement.maxPoint}</div>
        </div>
        <div className="flex flex-col justify-center align-top w-48">
            <div className="font-bold text-gray-600 text-lg break-words">{requirement.name}</div>
            <div className="text-sm break-words">{requirement.description}</div>
        </div>

        {editable && roles.includes(SemesterRole.REVIEW_CHALLENGE) && <>
            <div className="flex flex-row justify-center align-middle items-center">
                <button className="w-12 h-12 px-2 hover:bg-gray-100 rounded-full" onClick={removeClickHandle}>
                    <TrashIcon color="#4b5563" width={ICON_WIDTH} height={ICON_HEIGHT} />
                </button>
                <button className="w-12 h-12 px-2 hover:bg-gray-100 rounded-full" onClick={editClickHandle}>
                    <PencilIcon color="#4b5563" width={ICON_WIDTH} height={ICON_HEIGHT} />
                </button>
            </div>
        </>}
    </div>
}

export default RequirementCard