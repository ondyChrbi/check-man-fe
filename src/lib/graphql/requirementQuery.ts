import {gql} from "@apollo/client";

export const getRequirementsQuery = gql`
    query GetRequirementsQuery($challengeId: ID!) {
        requirements(challengeId: $challengeId) {
            id,
            name,
            description,
            minPoint,
            maxPoint
        }
    }
`;

export const createRequirementMutation = gql`
    mutation CreateRequirementMutation($challengeId: ID!, $input: RequirementInput!) {
        createRequirement(challengeId: $challengeId, input: $input) {
            id,
            description,
            minPoint,
            maxPoint
        }
    }
`;

export const editRequirementMutation = gql`
    mutation EditRequirementMutation($requirementId: ID!, $input: RequirementInput!) {
        editRequirement(id: $requirementId, input: $input) {
            id,
            description,
            minPoint,
            maxPoint
        }
    }
`;

export const removeRequirementMutation = gql`
    mutation RemoveRequirementMutation($requirementId: ID!) {
        deleteRequirement(id: $requirementId) {
            id,
            description,
            minPoint,
            maxPoint
        }
    }
`;

export interface RequirementQuery {
    requirements: Array<Requirement>
}

export interface Requirement {
    id: number,
    name: string,
    description? : string | undefined,
    minPoint? : number | undefined,
    maxPoint? : number | undefined,
}

export interface RequirementInput {
    name: string,
    description? : string | undefined,
    minPoint? : number | undefined,
    maxPoint? : number | undefined,
}

export interface CreateRequirementVariables{
    challengeId: string | number,
    input: RequirementInput
}

export interface EditRequirementVariables{
    requirementId: string | number,
    input: RequirementInput
}

export interface CreateRequirementMutation{
    createRequirement : Requirement
}

export interface EditRequirementMutation{
    editRequirement : Requirement
}

export interface RemoveRequirementMutation{
    removeRequirement : Requirement
}

export interface RemoveRequirementVariables{
    requirementId: string | number,
}
