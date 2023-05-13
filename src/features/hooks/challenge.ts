import {useMutation, useQuery} from "@apollo/client";
import {
    ChallengeKind,
    ChallengeQuery,
    createChallengeMutation,
    CreateChallengeMutation,
    CreateChallengeVariables,
    editChallengeMutation,
    EditChallengeMutation,
    EditChallengeVariables,
    getChallengeQuery,
    getChallengesQuery
} from "../../lib/graphql/challengeQuery";
import {useTranslation} from "react-i18next";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
    createRequirementMutation,
    CreateRequirementMutation,
    CreateRequirementVariables, editRequirementMutation, EditRequirementMutation, EditRequirementVariables,
    getRequirementsQuery,
    RemoveRequirementMutation,
    removeRequirementMutation,
    RemoveRequirementVariables
} from "../../lib/graphql/requirementQuery";
import {useState} from "react";
import axios from "axios";
import {useAppSelector} from "../storage/hooks";
import {showErrorToast, showSuccessToast} from "../../components/editor/helpers";

interface UseChallengeProps {
    semesterId: string | number | undefined
}

export const useChallenge = ({semesterId}: UseChallengeProps) => {
    const {t} = useTranslation();

    const getChallenge = (challengeId: string | undefined) => useQuery<ChallengeQuery>(getChallengeQuery, {variables: {"id": challengeId}});
    const [createChallenge] = useMutation<CreateChallengeMutation, CreateChallengeVariables>(createChallengeMutation, {
        refetchQueries: [{ query: getChallengesQuery, variables: { semesterId } }],
    });
    const [editChallenge] = useMutation<EditChallengeMutation, EditChallengeVariables>(editChallengeMutation, {
        refetchQueries: [{ query: getChallengesQuery, variables: { semesterId } }],
    });

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

interface UseRequirementsProps {
    challengeId?: string | number
}

export const useRequirements = ({ challengeId } : UseRequirementsProps) => {
    const {t} = useTranslation();
    const [createRequirement] = useMutation<CreateRequirementMutation, CreateRequirementVariables>(createRequirementMutation, {
        refetchQueries: [{ query: getRequirementsQuery, variables: { challengeId } }],
    });
    const [editRequirement] = useMutation<EditRequirementMutation, EditRequirementVariables>(editRequirementMutation, {
        refetchQueries: [{ query: getRequirementsQuery, variables: { challengeId } }],
    });
    const [removeRequirement] = useMutation<RemoveRequirementMutation, RemoveRequirementVariables>(removeRequirementMutation, {
        refetchQueries: [{ query: getRequirementsQuery, variables: { challengeId } }],
    });

    const resolver = yupResolver(yup.object({
        "name": yup.string()
            .max(256, t('challenge.action.name.error.max-length'))
            .required(t('challenge.action.name.error.required')),
        "description": yup.string()
            .max(1024, t('challenge.action.name.error.max-length'))
            .required(t('challenge.action.name.error.required'))
            .nullable(),
        "minPoint": yup.number()
            .nullable(),
        "maxPoint": yup.number()
            .nullable(),
    }));

    return {createRequirement, editRequirement, removeRequirement, resolver};
}

const TESTING_SUBSYSTEM_API_URL = import.meta.env.VITE_TESTING_SUBSYSTEM_API_URL;

export interface SolutionDtoV1 {
    id: number;
    path: string;
    uploadDate: Date;
}

export const useChallengeUpload = (challengeId: string | number) => {
    const {t} = useTranslation();

    const [uploadProgress, setUploadProgress] = useState(0);
    const authenticationInfo = useAppSelector((state) => state.storage.authentication.jwtInfo);

    const uploadSolution = async (solution : any, onComplete: () => void | Promise<void>) => {
        if (!solution || !challengeId || !authenticationInfo?.token) {
            return;
        }

        const formData = new FormData();
        formData.append('file', solution);

        try {
            const result = await axios.post<SolutionDtoV1>(`${TESTING_SUBSYSTEM_API_URL}/challenge/${challengeId}/solution`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `${authenticationInfo.token}`
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent && progressEvent.total) {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(percentCompleted);
                    }
                },
            });

            showSuccessToast(t('challenge.solution.upload.action.uploaded'));
            await onComplete();
            return result.data;
        } catch (error) {
            showErrorToast(error);
        }
    };

    return {uploadSolution, uploadProgress}
}
