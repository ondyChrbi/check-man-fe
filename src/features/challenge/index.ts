import {Challenge} from "../../lib/graphql/challengeQuery";

export interface ChallengeMap {
    optional: Array<Challenge>,
    mandatory: Array<Challenge>,
    credit: Array<Challenge>,
    exam: Array<Challenge>
}