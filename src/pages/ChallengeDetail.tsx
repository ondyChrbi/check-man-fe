import {useQuery} from "@apollo/client";
import {ChallengeQuery, getChallengeQuery} from "../lib/graphql/challengeQuery";
import LoadingSpinner from "../components/LoadingSpinner";
import React from "react";
import {useParams} from "react-router-dom";
import RequirementList from "../components/course/ui/challenge/requirement/RequirementList";
import {useTranslation} from "react-i18next";
import RequirementEditor from "../components/course/ui/challenge/requirement/RequirementEditor";

interface Props {
    argChallengeId?: number
}

const ChallengeDetail = ({argChallengeId}: Props) => {
    const {t} = useTranslation();

    const {challengeId} = useParams<'challengeId'>();
    const {loading, error, data} = useQuery<ChallengeQuery>(getChallengeQuery, {
        variables: { "id" : (argChallengeId) ?? challengeId }
    });

    if (loading) {
        return <div className="w-full h-full flex flex-row items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    if (error || !challengeId) return <>Error</>

    return <>
        <h1 className="my-7 text-gray-600 font-light text-4xl">{data?.challenge.name}</h1>
        {data?.challenge && <div dangerouslySetInnerHTML={{__html: data?.challenge.description}}></div>}
        <RequirementList challengeId={challengeId} />
        <h2 className="my-7 text-gray-600 font-light text-4xl">{t('requirement.new.title')}</h2>
        <RequirementEditor challengeId={challengeId} />
    </>
}

export default ChallengeDetail