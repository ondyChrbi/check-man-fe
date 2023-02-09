import {useQuery} from "@apollo/client";
import {getRequirementsQuery, Requirement, RequirementQuery} from "../../../../../lib/graphql/requirementQuery";
import LoadingSpinner from "../../../../LoadingSpinner";
import React, {useState} from "react";
import RequirementCard from "./RequirementCard";
import {PlusIcon} from "@heroicons/react/24/solid";
import {useTranslation} from "react-i18next";

interface Props {
    challengeId: number | string
    semesterId: number | string
    editable?: boolean
    onNewRecord?: () => Promise<void> | void
    onEditRecord?: (requirement: Requirement) => Promise<void> | void
}

const RequirementList = ({challengeId, semesterId, onNewRecord, onEditRecord, editable = false}: Props) => {
    const {data, loading} = useQuery<RequirementQuery>(getRequirementsQuery, {
        variables: {"challengeId": challengeId}
    });

    const onEditRequirementClickHandle = async (requirement: Requirement) => {
        if (onEditRecord) {
            await onEditRecord(requirement)
        }
    }

    if (loading) {
        return <div className="w-full h-full flex flex-row items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    return <div className="flex flex-wrap justify-start items-center w-full">
        {data?.requirements.map((requirement) =>
            <RequirementCard key={requirement.id} requirement={requirement} challengeId={challengeId}
                             semesterId={semesterId}
                             onEditRequirementClick={onEditRequirementClickHandle} editable={editable}/>
        )}
        {editable && <AddRequirementButton onClick={onNewRecord} />}
    </div>
}

const ICON_WIDTH = 30;
const ICON_HEIGHT = 30;

interface AddRequirementButtonProps {
    onClick?: () => Promise<void> | void
}


const AddRequirementButton = ({onClick} : AddRequirementButtonProps) => {
    const {t} = useTranslation();
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    const clickedHandle = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if (onClick) {
            await onClick();
        }
    }

    return <button onClick={clickedHandle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}
            className="flex flex-row justify-center items-center h-full hover:bg-gray-100 rounded-full p-4">
        <PlusIcon color="#4b5563" width={ICON_WIDTH} height={ICON_HEIGHT} />
        {isHovering && t('challenge.requirement.new.title')}
    </button>
}

export default RequirementList;