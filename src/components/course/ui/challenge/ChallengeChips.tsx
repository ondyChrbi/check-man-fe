import Chip from "../../../ui/Chip";
import {ClockIcon} from "@heroicons/react/24/outline";
import {toFormattedDate} from "../../../../features/helper";
import {PencilIcon} from "@heroicons/react/24/solid";
import React from "react";
import {useTranslation} from "react-i18next";
import {Challenge, ChallengeKind} from "../../../../lib/graphql/challengeQuery";

interface Props {
    challenge: Challenge,
    iconWidth?: number,
    iconHeight?: number,
}

const ChallengeChips = ({challenge, iconWidth = ICON_WIDTH, iconHeight = ICON_HEIGHT} : Props) => {
    const {t} = useTranslation();

    return <>
        {challenge.deadlineDate && <Chip bgColor={'bg-red-600'} textColor={'text-white'}>
            <ClockIcon className="mr-1" width={iconWidth} height={iconHeight} />
            {toFormattedDate(challenge.deadlineDate)}
        </Chip>
        }
        <Chip bgColor={challengeKindColors.get(challenge.challengeKind)}
              textColor={'text-white'}>
            {t(challengeKindSelectValue.get(challenge.challengeKind))}
        </Chip>
        {!challenge.published &&
            <Chip bgColor={'bg-yellow-500'} textColor={'text-white'}>
                <PencilIcon className="mr-1" width={ICON_WIDTH} height={ICON_HEIGHT}/>
                {t('challenge.not-published')}
            </Chip>
        }
    </>
}

const challengeKindSelectValue = new Map();
challengeKindSelectValue.set(ChallengeKind.OPTIONAL, 'challenge.action.challenge-kind.option.optional');
challengeKindSelectValue.set(ChallengeKind.MANDATORY, 'challenge.action.challenge-kind.option.mandatory');
challengeKindSelectValue.set(ChallengeKind.CREDIT, 'challenge.action.challenge-kind.option.credit');
challengeKindSelectValue.set(ChallengeKind.EXAM, 'challenge.action.challenge-kind.option.exam');

const challengeKindColors = new Map();
challengeKindColors.set(ChallengeKind.OPTIONAL, 'bg-blue-300');
challengeKindColors.set(ChallengeKind.MANDATORY, 'bg-blue-600');
challengeKindColors.set(ChallengeKind.CREDIT, 'bg-purple-600');
challengeKindColors.set(ChallengeKind.EXAM, 'bg-gray-800');

const ICON_WIDTH = 15;
const ICON_HEIGHT = 15;

export default ChallengeChips;