import {useQuery} from "@apollo/client";
import {ChallengeQuery, getChallengeQuery} from "../lib/graphql/challengeQuery";
import LoadingSpinner from "../components/LoadingSpinner";
import React from "react";
import {useParams} from "react-router-dom";

interface Props {
    argChallengeId?: number
}

const ChallengeDetail = ({argChallengeId}: Props) => {
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
        <h1 className="font-roboto">{data?.challenge.name}</h1>
        <p className="font-roboto">{data?.challenge.description}</p>
    </>
}

export default ChallengeDetail