import {SemesterRole} from "../../../../../lib/graphql/courseQuery";
import ChallengePublishButton from "./button/ChallengePublishButton";
import ShowModalButton from "../../../../ui/modal/ShowModalButton";
import {PlusIcon, WrenchIcon} from "@heroicons/react/24/solid";
import AutomaticTestEditor from "../solution/test/AutomaticTestEditor";
import React from "react";
import {useTranslation} from "react-i18next";
import {Challenge} from "../../../../../lib/graphql/challengeQuery";
import {useCourseRoles} from "../../../../../features/authorization/hooks";
import RequirementEditor from "../requirement/RequirementEditor";

interface Props {
    courseId: string | number;
    semesterId: string | number;
    challenge: Challenge;
}

const ChallengeAdministrationToolbar = ({courseId, semesterId, challenge}: Props) => {
    const {t} = useTranslation();
    const {roles} = useCourseRoles(semesterId!);

    return <>
        {!challenge.published && <div className="py-5 flex flex-row gap-2">
            {roles.includes(SemesterRole.EDIT_CHALLENGE) &&
                <ChallengePublishButton courseId={courseId} semesterId={semesterId!} challengeId={challenge.id} />
            }

            {roles.includes(SemesterRole.EDIT_CHALLENGE) &&
                <ShowModalButton buttonTitle={t('challenge.test.action.set')}
                                 modalTitle={t('challenge.test.module.editor.message')}
                                 css={"bg-gray-300 hover:bg-gray-500 text-black hover:text-white font-bold"}
                                 icon={<WrenchIcon width={20} height={20}></WrenchIcon>}>
                    <AutomaticTestEditor challenge={challenge} />
                </ShowModalButton>
            }

            {!challenge.published && roles.includes(SemesterRole.EDIT_CHALLENGE) &&
                <ShowModalButton buttonTitle={t('challenge.requirement.new.title')}
                                 modalTitle={t('challenge.requirement.new.title')}
                                 css={"bg-gray-300 hover:bg-gray-500 text-black hover:text-white font-bold"}
                                 icon={<PlusIcon width={20} height={20}></PlusIcon>}>
                    <RequirementEditor challengeId={challenge.id} />
                </ShowModalButton>
            }
        </div>}
    </>;
}

export default ChallengeAdministrationToolbar;