import CollapsibleTable from "../../../ui/CollapsibleTable";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useQuery} from "@apollo/client";
import {
    courseQueryWithRelatedUser,
    CourseQueryWithRelatedUserQuery,
    CourseQueryWithRelatedUserVariables
} from "../../../../lib/graphql/courseQuery";
import LoadingSpinner from "../../../LoadingSpinner";
import {AppUser} from "../../../../lib/graphql/meQuery";

const DEFAULT_OFFSET = 0;
const DEFAULT_SIZE = 10;

interface Props {
    courseId: number | string,
    semesterId: number | string,
}

const CourseUserTable = ( {courseId, semesterId} : Props) => {
    const {t} = useTranslation();

    const [offset, setOffset] = useState<number>(DEFAULT_OFFSET);
    const {data, loading, error} = useQuery<CourseQueryWithRelatedUserQuery, CourseQueryWithRelatedUserVariables>(courseQueryWithRelatedUser,
        { variables: { courseId , semesterId }}
    );

    const CAPTIONS = [
        t('course.users.manager.stag-id'),
        t('course.users.manager.mail'),
        t('course.users.manager.display-name'),
    ];

    const previousPageHandle = () => {
        if (offset > 0) {
            setOffset(offset - 1);
        }
    }

    const nextPageHandle = () => {
        const max = Math.floor(DEFAULT_SIZE);

        if (offset < max) {
            setOffset(offset + 1);
        }
    }

    if (loading) {
        return <div className="w-full h-full flex flex-row items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    if (error || !data || !(data.semester?.relatedUsers)) {
        return <p>Error</p>
    }

    return <div className="flex flex-col">
        <CollapsibleTable captions={CAPTIONS} offset={offset} onNextPageClicked={nextPageHandle}
                          onPreviousPageClicked={previousPageHandle}
                          max={Math.floor(DEFAULT_SIZE)}>
            {data.semester?.relatedUsers.map((user) =>
                <CourseUserTableBody user={user} />
            )}
        </CollapsibleTable>
    </div>
}

interface CourseUserTableBodyProps {
    user: AppUser
}

const CourseUserTableBody = ({user}: CourseUserTableBodyProps) => {
    return <tr key={user.id} className="bg-white border-b">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {user.stagId}
        </th>
        <td className="px-6 py-4">
            {user.mail}
        </td>
        <td className="px-6 py-4">
            {user.displayName}
        </td>
        <td className="px-6 py-4">
        </td>
    </tr>
}

export default CourseUserTable;