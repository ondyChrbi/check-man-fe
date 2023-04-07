import {Challenge, ChallengeInput, ChallengeKind} from "../../lib/graphql/challengeQuery";
import {ChallengeMap} from "./index";

export const toChallengeInput = (challenge: Challenge) : ChallengeInput => {
    const {name, description, deadlineDate, startDate, challengeKind} = challenge

    return {name, description, deadlineDate, startDate, challengeKind}
}

export const groupChallenges = (challenges: Array<Challenge>) => {
    const grouped: ChallengeMap = {
        optional: [],
        mandatory: [],
        credit: [],
        exam: []
    };

    challenges.forEach((challenge) => {
        switch (challenge.challengeKind) {
            case ChallengeKind.OPTIONAL:
                grouped.optional.push(challenge)
                break;
            case ChallengeKind.MANDATORY:
                grouped.mandatory.push(challenge)
                break;
            case ChallengeKind.CREDIT:
                grouped.credit.push(challenge)
                break;
            case ChallengeKind.EXAM:
                grouped.exam.push(challenge)
                break;
        }
    });

    return grouped;
}
