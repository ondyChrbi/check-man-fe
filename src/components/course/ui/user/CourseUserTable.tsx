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
import CourseUserRolesList from "./CourseUserRolesList";
import {ArchiveBoxXMarkIcon, CheckIcon, UserPlusIcon} from "@heroicons/react/24/solid";
import {Link} from "react-router-dom";

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
        '',
        t('course.users.manager.stag-id'),
        t('course.users.manager.mail'),
        t('course.users.manager.display-name'),
        t('course.users.manager.roles'),
        t('course.users.manager.actions'),
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
                <CourseUserTableBody user={user} courseId={courseId} semesterId={semesterId} />
            )}
        </CollapsibleTable>
    </div>
}

interface CourseUserTableBodyProps {
    user: AppUser
    courseId: number | string
    semesterId: number | string
}

const WIDTH = 15;
const HEIGHT = 15;

const CourseUserTableBody = ({user, courseId, semesterId}: CourseUserTableBodyProps) => {
    return <tr key={user.id} className="bg-white border-b">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            { user.disabled ? <ArchiveBoxXMarkIcon width={WIDTH} height={HEIGHT} /> : <CheckIcon width={WIDTH} height={HEIGHT} /> }
        </th>
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
            <CourseUserRolesList roles={user.roles} />
        </td>
        <td className="px-6 py-4">
            <CourseUserTableActions courseId={courseId} semesterId={semesterId} userId={user.id} />
        </td>
    </tr>
}

interface CourseUserTableActionsProps {
    courseId: number | string
    semesterId: number | string
    userId: number | string
}

const CourseUserTableActions = ({courseId, semesterId, userId} : CourseUserTableActionsProps) => {
    return <Link to={`/courses/${courseId}/semester/${semesterId}/users/${userId}`}>
        <div className="flex flex-row justify-center items-center align-middle">
            <button className="rounded-full w-fit hover:bg-teal-200 text-gray-800 font-bold py-2 p-2 inline-flex items-center">
                <UserPlusIcon width={WIDTH} height={HEIGHT} />
            </button>
        </div>
    </Link>
}

export default CourseUserTable;