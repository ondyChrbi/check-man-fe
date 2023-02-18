import {course, CourseQuery, CourseVariables, Semester} from "../../lib/graphql/courseQuery";
import React, {useState} from "react";
import {ArchiveBoxXMarkIcon, CheckIcon} from "@heroicons/react/24/solid";
import {isBetween, toFormattedDateTime} from "../../features/helper";
import CollapsibleTable from "../ui/CollapsibleTable";
import {useQuery} from "@apollo/client";
import {useTranslation} from "react-i18next";
import LoadingSpinner from "../LoadingSpinner";

const DEFAULT_OFFSET = 0;
const DEFAULT_SIZE = 10;

interface Props {
    courseId: number | string
}

const CourseSemesterList = ({courseId} : Props) => {
    const {t} = useTranslation();

    const [offset, setOffset] = useState<number>(DEFAULT_OFFSET);
    const {data, loading, error} = useQuery<CourseQuery, CourseVariables>(course, {
        variables: {id: courseId!}
    });

    const CAPTIONS = [
        '',
        t('course.manager.id'),
        t('course.manager.date-start'),
        t('course.manager.date-end'),
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

    if (error) {
        return <p>Error</p>
    }

    return <CollapsibleTable captions={CAPTIONS} offset={offset} onNextPageClicked={nextPageHandle}
                             onPreviousPageClicked={previousPageHandle}
                             max={Math.floor(DEFAULT_SIZE)}>
        {data?.course?.semesters?.map((semester) =>
            <SemesterTableBody semester={semester} />
        )}
    </CollapsibleTable>
}

interface SemesterTableBodyProps {
    semester: Semester
    onClick?: () => void | Promise<void>
}

const ICON_WIDTH = 30;
const ICON_HEIGHT = 30;

const SemesterTableBody = ({semester, onClick}: SemesterTableBodyProps) => {
    const clickHandle = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if (onClick) {
            await onClick();
        }
    }

    return <tr onClick={clickHandle} key={semester.id} className="bg-white border-b">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {isActive(semester.dateStart, semester.dateEnd) ? <ArchiveBoxXMarkIcon width={ICON_WIDTH} height={ICON_HEIGHT} /> : <CheckIcon width={ICON_WIDTH} height={ICON_HEIGHT} /> }
        </th>
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {semester.id}
        </th>
        <td className="px-6 py-4">
            {toFormattedDateTime(semester.dateStart)}
        </td>
        <td className="px-6 py-4">
            {toFormattedDateTime(semester.dateEnd)}
        </td>
    </tr>
}

const isActive = (startDate: string, endDate: string) => isBetween(startDate, endDate)

export default CourseSemesterList;