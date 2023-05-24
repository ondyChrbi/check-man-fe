import {useQuery} from "@apollo/client";
import {
    getSemesterAccessRequests,
    GetSemesterAccessRequestsQuery,
    GetSemesterAccessRequestsVariables
} from "../../../lib/graphql/accessRequestQuery";
import {showErrorToast} from "../../../components/editor/helpers";
import {useTranslation} from "react-i18next";
import LoadingSpinner from "../../../components/loading/LoadingSpinner";
import {useParams} from "react-router-dom";
import AccessRequestRow from "../../../components/course/access/AccessRequestRow";

const CourseAccessManager = () => {
    const {semesterId} = useParams<'semesterId'>();
    const {t} = useTranslation();

    const {
        data, loading
    } = useQuery<GetSemesterAccessRequestsQuery, GetSemesterAccessRequestsVariables>(getSemesterAccessRequests, {
        variables: {semesterId: semesterId!!},
        onError: (error) => {
            showErrorToast(error)
        },
    });

    if (loading) {
        return <div className="w-full h-full flex flex-row items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    return <div className="flex flex-col">
        {data?.semesterAccessRequests?.length ?
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {t('course.semester.available.access.table.name')}
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {t('course.semester.available.access.table.stag-id')}
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {t('course.semester.available.access.table.creation-date')}
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {t('course.semester.available.access.table.expiration-date')}
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {data?.semesterAccessRequests.map(request =>
                                <AccessRequestRow key={request.id} request={request}/>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> : t('course.semester.available.access.no-requests')}
    </div>;
};

export default CourseAccessManager;
