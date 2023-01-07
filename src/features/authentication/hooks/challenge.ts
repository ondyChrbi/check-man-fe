import {useMutation, useQuery} from "@apollo/client";
import {
    ChallengeKind, ChallengeQuery,
    createChallengeMutation,
    CreateChallengeMutation,
    CreateChallengeVariables, editChallengeMutation, EditChallengeMutation, EditChallengeVariables, getChallengeQuery
} from "../../../lib/graphql/challengeQuery";
import {useTranslation} from "react-i18next";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

export const useChallenge = () => {
    const {t} = useTranslation();

    const getChallenge = (challengeId: string | undefined) => useQuery<ChallengeQuery>(getChallengeQuery, {variables: {"id": challengeId}});
    const [createChallenge] = useMutation<CreateChallengeMutation, CreateChallengeVariables>(createChallengeMutation);
    const [editChallenge] = useMutation<EditChallengeMutation, EditChallengeVariables>(editChallengeMutation);

    const challengeKindSelectValue = new Map();
    challengeKindSelectValue.set(ChallengeKind.OPTIONAL, t('challenge.action.challenge-kind.option.optional'));
    challengeKindSelectValue.set(ChallengeKind.MANDATORY, t('challenge.action.challenge-kind.option.mandatory'));
    challengeKindSelectValue.set(ChallengeKind.CREDIT, t('challenge.action.challenge-kind.option.credit'));
    challengeKindSelectValue.set(ChallengeKind.EXAM, t('challenge.action.challenge-kind.option.exam'));

    const resolver = yupResolver(yup.object({
        "name": yup.string()
            .max(128, t('challenge.action.name.error.max-length'))
            .required(t('challenge.action.name.error.required')),
        "challengeKind": yup.mixed()
            .oneOf(Object.values(ChallengeKind))
            .required(t('challenge.action.challenge-kind.error.required')),
        "startDate": yup.date()
            .transform(function (value) {
                return value.toISOString();
            }),
        "deadlineDate": yup.date()
            .transform(function (value) {
                return value.toISOString();
            }),
    }));

    return {getChallenge, createChallenge, editChallenge, challengeKindSelectValue, resolver};
}
