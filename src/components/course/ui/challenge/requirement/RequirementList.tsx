import {useQuery} from "@apollo/client";
import {getRequirementsQuery, Requirement, RequirementQuery} from "../../../../../lib/graphql/requirementQuery";
import LoadingSpinner from "../../../../LoadingSpinner";
import React, {useState} from "react";
import RequirementEditor from "./RequirementEditor";
import RequirementCard from "./RequirementCard";

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

    return <div className="flex flex-wrap justify-start space-x-2 items-end w-full">
        {data?.requirements.map((requirement) =>
            (editingRequirementId !== requirement.id) ?
                <RequirementCard key={requirement.id} requirement={requirement} challengeId={challengeId}
                                 onEditRequirementClick={onEditRequirementClickHandle} editable={editable} /> :
                <RequirementEditor challengeId={challengeId} requirementId={requirement.id}
                                   onFinished={resetEditing} />
        )}
    </div>
}

export default RequirementList;