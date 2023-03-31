import {Challenge} from "../../../lib/graphql/challengeQuery";
import React, {useState} from "react";
import ChallengeDescriptionEditor from "./ChallengeDescriptionEditor";

interface Props {
    semesterId: number | string
    challenge: Challenge,
    editable?: boolean
}

const ChallengeDescription = ({semesterId, challenge, editable = false}: Props) => {
    const [editingMode, setEditingMode] = useState(editable);
    const [description, setDescription] = useState(challenge.description);

    const clickHandle = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if (challenge.published || !editable) { return }
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