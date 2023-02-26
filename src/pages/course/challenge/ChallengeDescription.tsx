import {Challenge} from "../../../lib/graphql/challengeQuery";
import React, {useState} from "react";
import ChallengeDescriptionEditor from "./ChallengeDescriptionEditor";

interface Props {
    semesterId: number | string
    challenge: Challenge,
    editMode?: boolean
}

const ChallengeDescription = ({semesterId, challenge, editMode = false}: Props) => {
    const [editingMode, setEditingMode] = useState(editMode);
    const [description, setDescription] = useState(challenge.description);

    const clickHandle = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if (challenge.published) { return }
        setEditingMode(true);
    };

    const editFinishedHandle = (challenge: Challenge) => {
        setDescription(challenge.description);
        setEditingMode(false);
    }

    return <div className="flex flex-col">
        {editingMode ?
            <ChallengeDescriptionEditor semesterId={semesterId} challenge={challenge} onEditFinished={editFinishedHandle} />:
            <div onClick={clickHandle} dangerouslySetInnerHTML={{__html: description}}></div>
        }
    </div>
}

export default ChallengeDescription;