import {TestResult} from "../../../../../../lib/graphql/solutionQuery";

interface Props {
    testResult: TestResult
}

const TestResultDetail = ({testResult} : Props) => {
    return <div className="flex flex-col">
        <h2>{testResult.status}</h2>
    </div>
}

export default TestResultDetail;