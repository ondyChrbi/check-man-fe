import {Requirement} from "../../../../../lib/graphql/requirementQuery";
import {useTranslation} from "react-i18next";
import {useRequirements} from "../../../../../features/hooks/challenge";
import React from "react";
import {showErrorToast, showSuccessToast} from "../../../../editor/helpers";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/solid";
import {useCourseRoles} from "../../../../../features/authorization/hooks";
import {SemesterRole} from "../../../../../lib/graphql/courseQuery";
import ShowModalButton from "../../../../ui/modal/ShowModalButton";
import RequirementEditor from "./RequirementEditor";
import {ReviewedRequirement} from "../../../../../lib/graphql/reviewQuery";
import {getColorProps} from "../../../../../features/challenge/review";

const ICON_WIDTH = 30;
const ICON_HEIGHT = 30;

interface Props {
    requirement: Requirement,
    points?: number | null | undefined,
    challengeId?: string | number,
    semesterId?: string | number,
    editable?: boolean | undefined | null,
}

const RequirementCard = ({ requirement, points, challengeId, semesterId, editable = false }: Props) => {
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

    return <div className="my-5 flex flex-row justify-start items-center w-96">
        <div className={`${ (getStyle(requirement)) } flex flex-row justify-center items-center align-middle w-24 h-24 rounded-full border-8 mr-2`}>
            <Points requirement={requirement} points={points} />
        </div>
        <div className="flex flex-col justify-center align-top w-48">
            <div className="font-bold text-gray-600 text-lg break-words">{(requirement as Requirement).name}</div>
            <div className="text-sm break-words">{requirement.description}</div>
        </div>

        {editable && roles.includes(SemesterRole.REVIEW_CHALLENGE) && <>
            <div className="flex flex-row justify-center align-middle items-center">
                <button className="w-12 h-12 px-2 hover:bg-gray-100 rounded-full" onClick={removeClickHandle}>
                    <TrashIcon color="#4b5563" width={ICON_WIDTH} height={ICON_HEIGHT} />
                </button>
                {challengeId &&
                    <ShowModalButton modalTitle={t('challenge.test.module.editor.message')}
                                                 css={"hover:bg-gray-200 text-white font-bold"}
                                                 icon={<PencilIcon color="#4b5563" width={ICON_WIDTH} height={ICON_HEIGHT} />}>
                        <RequirementEditor challengeId={challengeId} requirement={requirement as Requirement} />
                    </ShowModalButton>
                }
            </div>
        </>}
    </div>
}

interface PointsProps {
    points?: number | null | undefined,
    requirement: Requirement,
}

const Points = ({points, requirement} : PointsProps) => {
    return <>
        <div className="text-gray-400">{points || requirement.minPoint}</div>
        {
            (requirement as Requirement).maxPoint && <>
                <div className="text-gray-400">/</div>
                <div>{(requirement as Requirement).maxPoint}</div>
            </>
        }

    </>
}

const getStyle = (requirement: Requirement | ReviewedRequirement) => {
    return (requirement as ReviewedRequirement).points ? getColorProps((requirement as ReviewedRequirement).points, requirement as Requirement) : "border-teal-600";
}

export default RequirementCard