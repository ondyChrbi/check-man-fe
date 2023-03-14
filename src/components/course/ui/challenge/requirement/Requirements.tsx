import {useQuery} from "@apollo/client";
import {getRequirementsQuery, Requirement, RequirementQuery} from "../../../../../lib/graphql/requirementQuery";
import LoadingSpinner from "../../../../LoadingSpinner";
import React from "react";
import RequirementCard from "./RequirementCard";
import FadeIn from "../../../../ui/animated/FadeIn";
import AddRequirementButton from "./AddRequirementButton";

interface Props {
    challengeId: number | string
    semesterId: number | string
    editable?: boolean
    onNewRecord?: () => Promise<void> | void
    onEditRecord?: (requirement: Requirement) => Promise<void> | void
}

const Requirements = ({challengeId, semesterId, onNewRecord, onEditRecord, editable = false}: Props) => {
    const {data, loading} = useQuery<RequirementQuery>(getRequirementsQuery, {
        variables: {"challengeId": challengeId}
    });

    const editRequirementClickHandle = async (requirement: Requirement) => {
        if (onEditRecord) {
            await onEditRecord(requirement)
        }
    }

    if (loading) {
        return <div className="w-full h-full flex flex-row items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    return <FadeIn>
        <div className="w-full flex flex-col">
            {data && data.requirements && data.requirements.length !== 0 ?
                <RequirementList requirements={data?.requirements} challengeId={challengeId} semesterId={semesterId}
                                 onEditRequirementClick={editRequirementClickHandle} editable={editable}
                                 onNewRecord={onNewRecord}/> :
                <>{editable && <EmptyRequirementsArea onClick={onNewRecord}/>}</>
            }
        </div>
    </FadeIn>
}

interface EmptyRequirementsAreaProps {
    onClick?: () => Promise<void> | void
}

const EmptyRequirementsArea = ({onClick = () => {}}: EmptyRequirementsAreaProps) => {
    return <div className="flex flex-col h-32 w-full justify-center align-middle items-center p-10">
        <AddRequirementButton onClick={onClick} hoveringTitle={false} />
    </div>
}

interface RequirementListProps {
    requirements: Array<Requirement>
    challengeId: number | string
    semesterId: number | string
    onEditRequirementClick: (requirement: Requirement) => void | Promise<void>
    editable?: boolean | null | undefined
    onNewRecord?: () => Promise<void> | void
}

const RequirementList = ({requirements, challengeId, semesterId, onEditRequirementClick, onNewRecord, editable = false}: RequirementListProps) => {
    return <div className="flex flex-wrap lg:justify-start justify-center items-center w-full">
        {requirements.map((requirement) =>
            <RequirementCard key={requirement.id} requirement={requirement} challengeId={challengeId}
                             semesterId={semesterId}
                             onEditRequirementClick={onEditRequirementClick} editable={editable}/>
        )}
        {editable && <AddRequirementButton onClick={onNewRecord}/>}
    </div>
}

export default Requirements;