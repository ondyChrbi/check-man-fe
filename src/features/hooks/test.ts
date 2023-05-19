import {useAppSelector} from "../storage/hooks";
import axios from "axios";
import {useTranslation} from "react-i18next";
import {showErrorToast, showSuccessToast} from "../../components/editor/helpers";
import {useMutation, useQuery} from "react-query";
import {TestConfiguration, TestConfigurationModuleInput, TestingModule} from "../challenge/test";
import {Challenge} from "../../lib/graphql/challengeQuery";
import {SolutionDtoV1} from "./challenge";
import {useState} from "react";

const TESTING_SUBSYSTEM_URL =` ${import.meta.env.VITE_TESTING_SUBSYSTEM_API_URL}`;

export const useTestConfiguration = (challenge: Challenge) => {
    const {t} = useTranslation();
    const authenticationInfo = useAppSelector((state) => state.storage.authentication.jwtInfo);

    const fetchData = async () => {
        if (!authenticationInfo?.token) {
            showErrorToast(t('common.message.not-authenticated'));
            return;
        }

        const result = await axios.get(`${TESTING_SUBSYSTEM_URL}/challenge/${challenge.id}/test-configuration`, {
            headers: {'Authorization': `${authenticationInfo.token}`}
        });

        return result.data as Promise<TestConfiguration>;
    };

    const testConfigurations = useQuery('test-configuration', fetchData);

    const postTestConfiguration = async (challenge: Challenge, testModule: TestConfigurationModuleInput) => {
        if (!authenticationInfo?.token) {
            showErrorToast(t('common.message.not-authenticated'));
            return;
        }

        const response = await axios.post(
            `${TESTING_SUBSYSTEM_URL}/challenge/${challenge.id}/test-configuration`,
            testModule,
            {headers: {'Authorization': `${authenticationInfo.token}`}}
        );

        return response.data as Promise<TestConfiguration>;
    };

    const addTestConfiguration = useMutation((
        testModule: TestConfigurationModuleInput) => postTestConfiguration(challenge, testModule),
        {onSuccess: async () => {
            await testConfigurations.refetch();
            showSuccessToast(t('common.message.add'));
        }}
    );

    const patchTestConfiguration = async (input: TestConfiguration) => {
        if (!authenticationInfo?.token) {
            showErrorToast(t('common.message.not-authenticated'));
            return;
        }

        const {id, ...data} = input;
        const response = await axios.patch(
            `${TESTING_SUBSYSTEM_URL}/test-configuration/${id}`,
            data,
            {headers: {'Authorization': `${authenticationInfo.token}`}}
        );

        return response.data as Promise<TestConfiguration>;
    };

    const editTestConfiguration = useMutation((input: TestConfiguration) => patchTestConfiguration(input));

    return { testConfigurations, addTestConfiguration, editTestConfiguration };
}

interface TestingModulesProps {
    onDownloadSuccess?: (data: Array<TestingModule>) => void;
}

export const useTestingModules = ({onDownloadSuccess = () => {}} : TestingModulesProps) => {
    const {t} = useTranslation();
    const authenticationInfo = useAppSelector((state) => state.storage.authentication.jwtInfo);

    const fetchData = async () => {
        if (!authenticationInfo?.token) {
            showErrorToast(t('common.message.not-authenticated'));
            return;
        }

        try {
            const result = await axios.get(`${TESTING_SUBSYSTEM_URL}/test-module`, {
                headers: {'Authorization': `${authenticationInfo.token}`}
            });

            return result.data as Promise<Array<TestingModule>>;
        } catch (error) {
            showErrorToast(t('common.message.not-authenticated'));
        }
    };

    const testingModules = useQuery('test-module', fetchData, {onSuccess : onDownloadSuccess});

    return { testingModules };
};

export const useTestConfigurationUpload = (testConfiguration: TestConfiguration) => {
    const {t} = useTranslation();

    const [uploadProgress, setUploadProgress] = useState(0);
    const authenticationInfo = useAppSelector((state) => state.storage.authentication.jwtInfo);

    const uploadTestConfiguration = async (template : any) => {
        if (!authenticationInfo?.token) {
            showErrorToast(t('common.message.not-authenticated'));
            return;
        }

        const formData = new FormData();
        formData.append('file', template);

        try {
            const result = await axios.patch<SolutionDtoV1>(`${TESTING_SUBSYSTEM_URL}/test-configuration/${testConfiguration.id}/template-path`, formData, {
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
            return result.data;
        } catch (error) {
            showErrorToast(error);
        }
    };

    return { uploadTestConfiguration, uploadProgress };
}