import {Requirement} from "../../../../../lib/graphql/requirementQuery";
import {useTranslation} from "react-i18next";
import {useRequirements} from "../../../../../features/authentication/hooks/challenge";
import React from "react";
import {showErrorToast, showSuccessToast} from "../../../../editor/helpers";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/solid";

const ICON_WIDTH = 30;
const ICON_HEIGHT = 30;

interface Props {
    requirement: Requirement,
    challengeId: string | number,
    onEditRequirementClick?: (requirementId: number) => void | undefined,
    editable?: boolean,
}

const RequirementCard = ({ requirement, challengeId, onEditRequirementClick, editable = false }: Props) => {
    const {t} = useTranslation();
    const {removeRequirement} = useRequirements({challengeId});

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
            await onEditRequirementClick(requirement.id);
        }
    };

    return <div className="my-5 flex flex-row justify-start max-w-md">
        <div
            className="w-20 h-20 flex flex-row justify-center items-center text-teal-600 border-teal-600 border-8 rounded-full text-2xl mr-5">
            <div className="text-gray-400">{requirement.minPoint}</div>
            <div className="text-gray-400">/</div>
            <div>{requirement.maxPoint}</div>
        </div>
        <div className="flex flex-col justify-center align-top">
            <div className="font-bold text-gray-600 text-lg">{requirement.name}</div>
            <div className="text-sm">{requirement.description}</div>
        </div>

        {editable && <>
            <div className="flex flex-row justify-center align-top">
                <button className="px-2" onClick={removeClickHandle}>
                    <TrashIcon color="#4b5563" width={ICON_WIDTH} height={ICON_HEIGHT} />
                </button>
                <button className="px-2" onClick={editClickHandle}>
                    <PencilIcon color="#4b5563" width={ICON_WIDTH} height={ICON_HEIGHT} />
                </button>
            </div>
        </>}
    </div>
}

export default RequirementCard