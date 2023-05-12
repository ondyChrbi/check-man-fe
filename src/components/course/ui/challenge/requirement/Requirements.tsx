import {useQuery} from "@apollo/client";
import {getRequirementsQuery, Requirement, RequirementQuery} from "../../../../../lib/graphql/requirementQuery";
import LoadingSpinner from "../../../../loading/LoadingSpinner";
import React from "react";
import RequirementCard from "./RequirementCard";

interface Props {
    challengeId: number | string
    semesterId: number | string
    editable?: boolean
    onEditRecord?: (requirement: Requirement) => Promise<void> | void
}

const Requirements = ({challengeId, semesterId, onEditRecord = () => {}, editable = false}: Props) => {
    const {data, loading} = useQuery<RequirementQuery>(getRequirementsQuery, {
        variables: {challengeId}
    });

    const editRequirementClickHandle = async (requirement: Requirement) => {
        await onEditRecord(requirement)

    }

    if (loading) {
        return <div className="w-full h-full flex flex-row items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    return <div className="w-full flex flex-col">
            {data && data.requirements && data.requirements.length !== 0 &&
                <RequirementList requirements={data?.requirements} challengeId={challengeId} semesterId={semesterId}
                                 onEditRequirementClick={editRequirementClickHandle} editable={editable} />
            }
    </div>
}

interface RequirementListProps {
    requirements: Array<Requirement>
    challengeId: number | string
    semesterId: number | string
    onEditRequirementClick: (requirement: Requirement) => void | Promise<void>
    editable?: boolean | null | undefined
}

const RequirementList = ({requirements, challengeId, semesterId, onEditRequirementClick, editable = false}: RequirementListProps) => {
    return <div className="flex flex-wrap lg:justify-start justify-center items-center w-full">
        {requirements.map((requirement) =>
            <RequirementCard key={requirement.id} requirement={requirement} challengeId={challengeId}
                             semesterId={semesterId}
                             onEditRequirementClick={onEditRequirementClick} editable={editable}/>
        )}
    </div>
}

export default Requirements;