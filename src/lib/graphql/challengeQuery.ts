import {gql} from "@apollo/client";
import {AppUser} from "./meQuery";

export const getChallengeQuery = gql`
    query GetChallengeQuery($semesterId: ID!) {
        challenges(semesterId: $semesterId) {
            id,
            name,
            description
        }
    }
`;

export interface ChallengesQuery {
    challenges: Array<Challenge>
}

export interface Challenge {
    id: number,
    name: string,
    description: string,
    deadlineDate?: string,
    startDate?: string,
    author? : AppUser
}