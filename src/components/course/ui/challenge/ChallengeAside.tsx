import React, {useState} from "react";
import {useQuery} from "@apollo/client";
import {Challenge, ChallengesQuery, getChallengesQuery} from "../../../../lib/graphql/challengeQuery";
import ChallengeList from "./ChallengeList";
import {useParams} from "react-router-dom";
import ChallengeAsideActionsMenu from "./ChallengeAsideActionsMenu";
import CollapsibleButton from "../../../CollapsibleButton";

import './ChallengeAside.css';
import {showErrorToast} from "../../../editor/helpers";
import {groupChallenges} from "../../../../features/challenge/helper";
import Header from "../../../header/Header";
import {SemesterRole} from "../../../../lib/graphql/courseQuery";
import ChallengeCreateButton from "./form/button/ChallengeCreateButton";
import {useCourseRoles} from "../../../../features/authorization/hooks";

interface Props {
    courseId: number | string
    semesterId: number | string
    open?: boolean | null | undefined
}

const HIDDEN = '-18rem';
const OPEN = '0rem'

const ChallengeAside = ({courseId, semesterId, open = true}: Props) => {
    const {roles} = useCourseRoles(semesterId);

    const {challengeId} = useParams<'challengeId'>();
    const {data} = useQuery<ChallengesQuery>(getChallengesQuery, {
        variables: {"semesterId": semesterId},
        onError: (error) => {
            showErrorToast(error);
        }
    });

    const [isOpen, setIsOpen] = useState(open!);

    const collapsibleButtonClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setIsOpen(!isOpen);
    }

    const challengePickedHandle = (_challenge: Challenge) => {
        setIsOpen(false);
    }

    const challenges = groupChallenges(data?.challenges || []);

    return <aside className="flex flex-row justify-start items-start md:w-80 h-full fixed background z-10" style={{left: (isOpen) ? OPEN : HIDDEN}}>
        <div className="flex flex-col justify-start items-start w-full h-full">
            <menu className="w-72 h-full">
                <div className="w-72 absolute top-0 left-0 overflow-y-auto z-0 h-full">
                    <div className="flex flex-row justify-start align-middle items-start w-full h-fit p-5">
                        <Header />
                    </div>
                    <div className="mt-10">
                        <ChallengeAsideActionsMenu courseId={courseId} semesterId={semesterId} />
                    </div>
                    <div className="mt-2.5">
                        <ChallengeList challenges={challenges} courseId={courseId} semesterId={semesterId}
                                       challengeId={challengeId!} onChallengePicked={challengePickedHandle}/>
                    </div>
                    <div className="flex flex-row justify-center items-center align-middle">
                        {roles.includes(SemesterRole.CREATE_CHALLENGE) &&
                            <ChallengeCreateButton semesterId={semesterId} courseId={courseId}/>
                        }
                    </div>
                </div>
            </menu>
        </div>
        <CollapsibleButton onClick={collapsibleButtonClickHandler} open={isOpen}/>
    </aside>
}

export default ChallengeAside;