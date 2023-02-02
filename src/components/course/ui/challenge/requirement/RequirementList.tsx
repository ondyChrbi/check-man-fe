import {useQuery} from "@apollo/client";
import {getRequirementsQuery, Requirement, RequirementQuery} from "../../../../../lib/graphql/requirementQuery";
import LoadingSpinner from "../../../../LoadingSpinner";
import React, {useState} from "react";
import {useRequirements} from "../../../../../features/authentication/hooks/challenge";
import {useTranslation} from "react-i18next";
import {showErrorToast, showSuccessToast} from "../../../../editor/helpers";
import RequirementEditor from "./RequirementEditor";

interface Props {
    challengeId: number | string
    editable?: boolean
}

const RequirementList = ({challengeId, editable = false}: Props) => {
    const {data, loading} = useQuery<RequirementQuery>(getRequirementsQuery, {
        variables: {"challengeId": challengeId}
    });
    const [editingRequirementId, setEditingRequirementId] = useState<number | null>(null);

    const onEditRequirementClickHandle = (requirementId: number) => {
        setEditingRequirementId(requirementId);
    }

    const resetEditing = () => {
        setEditingRequirementId(null);
    }

    if (loading) {
        return <div className="w-full h-full flex flex-row items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    return <div className="flex flex-col w-full p-2">
        {data?.requirements.map((requirement) =>
            (editingRequirementId !== requirement.id) ?
                <RequirementCard key={requirement.id} requirement={requirement} challengeId={challengeId}
                                 onEditRequirementClick={onEditRequirementClickHandle} editable={editable} /> :
                <RequirementEditor challengeId={challengeId} requirementId={requirement.id}
                                   onFinished={resetEditing} />
        )}
    </div>
}

interface RequirementCardProps {
    requirement: Requirement,
    challengeId: string | number,
    onEditRequirementClick?: (requirementId: number) => void | undefined,
    editable?: boolean,
}

const RequirementCard = ({requirement, challengeId, onEditRequirementClick, editable = false}: RequirementCardProps) => {
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

    return <div className="my-5 flex flex-row justify-between">
        <div className="flex flex-col justify-start align-top">
            <div>{requirement.name}</div>
            <div>{requirement.description}</div>
        </div>
        <div>{requirement.minPoint}/{requirement.maxPoint}</div>
        {editable && <>
            <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={removeClickHandle}>
                    {t('common.button.remove')}
                </button>
            </div>
            <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={editClickHandle}>
                    {t('common.button.edit')}
                </button>
            </div>
        </>}
    </div>
}

export default RequirementList;