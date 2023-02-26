import {Challenge, ChallengeInput} from "../../lib/graphql/challengeQuery";

export const toChallengeInput = (challenge: Challenge) : ChallengeInput => {
    const {name, description, deadlineDate, startDate, challengeKind} = challenge

    return {name, description, deadlineDate, startDate, challengeKind}
}