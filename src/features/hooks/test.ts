import {useAppSelector} from "../storage/hooks";
import axios from "axios";
import {useTranslation} from "react-i18next";
import {showErrorToast} from "../../components/editor/helpers";
import {useQuery} from "react-query";
import {TestConfiguration} from "../challenge/test";
import {Challenge} from "../../lib/graphql/challengeQuery";

const TESTING_SUBSYSTEM_URL =` ${import.meta.env.VITE_TESTING_SUBSYSTEM_API_URL}/challenge`;

export const useTestConfiguration = (challenge: Challenge) => {
    const {t} = useTranslation();
    const authenticationInfo = useAppSelector((state) => state.storage.authentication.jwtInfo);

    const fetchData = async () => {
        if (!authenticationInfo?.token) {
            showErrorToast(t('common.message.not-authenticated'));
            return;
        }

        const result = await axios.get(`${TESTING_SUBSYSTEM_URL}/${challenge.id}/template`, {
            headers: {'Authorization': `${authenticationInfo.token}`}
        });

        return result.data as Promise<Array<TestConfiguration>>;
    };

    const testConfigurations = useQuery('test', fetchData);

    return { testConfigurations };
}