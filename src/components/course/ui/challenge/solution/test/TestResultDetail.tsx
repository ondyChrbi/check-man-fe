import {useQuery} from "@apollo/client";
import {TestResultQuery, testResultQuery, TestResultVariables} from "../../../../../../lib/graphql/solutionQuery";
import {showErrorToast} from "../../../../../editor/helpers";
import LoadingSpinner from "../../../../../LoadingSpinner";
import React from "react";
import {useParams} from "react-router-dom";


const TestResultDetail = () => {
    const {testResultId : id} = useParams<'testResultId'>();

    const {data, loading} = useQuery<TestResultQuery, TestResultVariables>(testResultQuery, {
        variables: {id},
        onError: (error) => {
            showErrorToast(error);
        },
    });

    if (loading) {
        return <div className="w-full h-full flex flex-row items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    const testResult = data?.testResult

    return <div className="flex flex-col w-full min-h-full">
        <h1>{testResult?.id}</h1>
        <code>{testResult?.log}</code>
    </div>
}

export default TestResultDetail;