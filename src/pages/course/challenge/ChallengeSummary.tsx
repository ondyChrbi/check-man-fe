import {useQuery} from "@apollo/client";
import {showErrorToast} from "../../../components/editor/helpers";
import {useParams} from "react-router-dom";
import {
    ChallengeSummaryQuery,
    ChallengeSummaryQueryVariables,
    getChallengeSummaryQuery
} from "../../../lib/graphql/challengeSummaryQuery";

const ChallengeSummary = () => {
    const {challengeId} = useParams<'challengeId'>();

    const {data, loading} = useQuery<ChallengeSummaryQuery, ChallengeSummaryQueryVariables>(getChallengeSummaryQuery, {
        variables: { id : challengeId! },
        onError: (error) => {
            showErrorToast(error)
        },
    });

    return <>
        {JSON.stringify(data)}
    </>
}

export default ChallengeSummary;