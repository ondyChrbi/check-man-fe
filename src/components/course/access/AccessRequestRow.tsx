import {toFormattedDateTime} from "../../../features/helper";
import {SemesterAccessRequest} from "../../../lib/graphql/courseQuery";
import ApproveCourseSemesterRequestButton from "./ApproveCourseSemesterRequestButton";
import {useTranslation} from "react-i18next";
import {AcademicCapIcon, BookOpenIcon} from "@heroicons/react/24/solid";
import {COURSE_STUDENTS_ROLES, COURSE_TEACHERS_ROLES} from "../../../features/course";

interface Props {
    request: SemesterAccessRequest;
}

const AccessRequestRow = ({request} : Props) => {
    const {t} = useTranslation();

    return <tr>
        {request.appUser && <>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{request.appUser.displayName}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{request.appUser.stagId}</div>
            </td>
        </>}
        <td className="px-6 py-4 whitespace-nowrap">
            <div
                className="text-sm text-gray-900">{toFormattedDateTime(request.creationDate)}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <div
                className="text-sm text-gray-900">{toFormattedDateTime(request.expirationDate)}</div>
        </td>
        <td>
            <div className="flex flex-col justify-center items-center align-middle space-y-1.5 p-1.5">
                <ApproveCourseSemesterRequestButton id={request.id} bgColor="bg-teal-700" roles={COURSE_STUDENTS_ROLES}
                                                    semesterId={request.semesterId}
                                                    icon={<AcademicCapIcon width={ICON_WIDTH} height={ICON_HEIGHT} />}
                                                    title={t('course.semester.available.access.approve.student')}
                />
                <ApproveCourseSemesterRequestButton id={request.id} bgColor="bg-teal-700" roles={COURSE_TEACHERS_ROLES}
                                                    semesterId={request.semesterId}
                                                    icon={<BookOpenIcon width={ICON_WIDTH} height={ICON_HEIGHT}/>}
                                                    title={t('course.semester.available.access.approve.teacher')
                }
                />
            </div>
        </td>
    </tr>
};

const ICON_WIDTH = 40;
const ICON_HEIGHT = 40;

export default AccessRequestRow