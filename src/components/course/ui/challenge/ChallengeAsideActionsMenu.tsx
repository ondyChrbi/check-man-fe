import {useCourseRoles} from "../../../../features/authorization/hooks";
import {SemesterRole} from "../../../../lib/graphql/courseQuery";
import {DocumentCheckIcon} from "@heroicons/react/24/solid";
import React from "react";
import {Link} from "react-router-dom";

const DEFAULT_WIDTH = 64;
const DEFAULT_HEIGHT = 64;

interface Props {
    courseId: number | string
    semesterId: number | string
}

const ChallengeAsideActionsMenu = ({courseId, semesterId} : Props) => {

    const {roles} = useCourseRoles(semesterId!);

    return <div className="my-2 flex flex-row items-center justify-center">
        {roles.includes(SemesterRole.REVIEW_CHALLENGE) &&
            <Link to={`/courses/${courseId}/review/editor`}>
                <div className="w-16 h-16 p-4 flex flex-col justify-center items-center bg-gray-400 rounded-lg cursor-pointer">
                    <DocumentCheckIcon color="#FFFFFF" width={DEFAULT_WIDTH} height={DEFAULT_HEIGHT} />
                </div>
            </Link>
        }
    </div>
}

export default ChallengeAsideActionsMenu;