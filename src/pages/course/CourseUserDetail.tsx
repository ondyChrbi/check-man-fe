import Avatar from "react-avatar";
import React, {useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {
    appUser, appUserAllRoles, AppUserAllRolesQuery,
    AppUserVariables,
    removeCourseRole,
    RemoveCourseRoleMutation, RemoveCourseRoleVariables
} from "../../lib/graphql/appUserQuery";
import LoadingSpinner from "../../components/LoadingSpinner";
import {useParams} from "react-router-dom";
import MetadataTable from "../../components/ui/MetadataTable";
import {useTranslation} from "react-i18next";
import {toFormattedDate, toFormattedDateTime} from "../../features/helper";
import {CourseSemesterRole} from "../../lib/graphql/meQuery";
import {showErrorToast} from "../../components/editor/helpers";
import CourseUserRolesList from "../../components/course/ui/user/CourseUserRolesList";
import CourseUserEditor from "../../components/course/ui/user/CourseUserEditor";
import {SemesterRole} from "../../lib/graphql/courseQuery";
import {TrashIcon} from "@heroicons/react/24/solid";

const SIZE = 80;
const ICON_WIDTH = 20;
const ICON_HEIGHT = 20;

const CourseUserDetail = () => {
    const {t} = useTranslation();
    const {semesterId, userId} = useParams<'semesterId' | 'userId'>();

    const [availableRoles, setAvailableRoles] = useState<Array<CourseSemesterRole>>([]);
    const [userRoles, setUserRoles] = useState<Array<CourseSemesterRole>>([]);

    const {data, loading, error} = useQuery<AppUserAllRolesQuery, AppUserVariables>(appUserAllRoles, {
        variables: {semesterId: semesterId!, id: userId!},
        onCompleted: (data) => {
            setUserRoles([...data.appUser.roles!])
            setAvailableRoles(data.allCourseRoles.filter(r => !(data.appUser.roles?.map(r => r.id).includes(r.id))));
        }
    });

    const [removeRole, {loading : removeRoleLoading}] = useMutation<RemoveCourseRoleMutation, RemoveCourseRoleVariables>(removeCourseRole, {
        onError: (error) => {
            showErrorToast(error);
        },
        refetchQueries: [{query: appUser, variables: {semesterId: semesterId!, id: userId!}}]
    });

    const removeRoleChipClickHandle = async (removedRole: CourseSemesterRole) => {
        if (!removeRoleLoading) {
            await removeRole({variables: {
                    semesterId: semesterId!, roleId: removedRole.id, appUserId: userId!
            }});
            setAvailableRoles([...(availableRoles.filter(r => r.id !== removedRole.id))])
        }
    }

    const addRoleChipClickHandle = async (addedRole: CourseSemesterRole) => {
        if (!removeRoleLoading) {
            setUserRoles([...userRoles, addedRole])
        }
    }

    if (loading) {
        return <div className="w-screen h-screen flex flex-row items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    if (error || !data) {
        return <p>Error</p>
    }

    const metadataRecords = [
        [t('course.users.manager.registration-date'), toFormattedDate(data.appUser.registrationDate)],
        [t('course.users.manager.lastAccess-date'), toFormattedDateTime(data.appUser.lastAccessDate)],
    ];

    return <div className="flex flex-col">
        <div className="flex flex-row w-full justify-between">
            <div className="flex flex-row">
                <div className="flex flex-col">
                    <Avatar className="mt-0.5" name={data.appUser.displayName} round={true} size={SIZE.toString()}/>
                </div>
                <div className="flex flex-col px-10">
                    <h1 className="font-roboto text-gray-600 text-3xl uppercase font-bold text-left">{data.appUser.displayName}</h1>
                    <h2 className="font-roboto my-1 text-gray-600 font-light text-1xl text-left">{data.appUser.mail}</h2>
                    <h3 className="font-roboto text-gray-500 font-light text-sm mb-3 text-left">{data.appUser.stagId}</h3>
                </div>
            </div>
            <div className="flex flex-row my-2">
                <MetadataTable title={t('course.users.metadata.title')} data={metadataRecords} />
            </div>
        </div>
        {userRoles.length > 0 &&
        <div className="flex flex-col mb-3">
            <h4 className="font-roboto text-gray-500 font-light text-xl mb-3 text-left">{t('course.users.roles.list.title')}</h4>
            <div className="flex flex-col">
                <CourseUserRolesList roles={userRoles} onRoleClicked={removeRoleChipClickHandle}
                                     itemIcon={<TrashIcon style={{margin: '0.05em'}} width={ICON_WIDTH} height={ICON_HEIGHT} />} />
            </div>
        </div>
        }
        {Object.values(SemesterRole).length !== userRoles.length &&
            <div className="flex flex-col my-3">
                <h4 className="font-roboto text-gray-500 font-light text-xl mb-3 text-left">{t('course.users.roles.add.title')}</h4>
                <CourseUserEditor onRoleClicked={addRoleChipClickHandle} semesterId={semesterId!} userId={userId!} availableRoles={availableRoles} />
            </div>
        }
    </div>
}



export default CourseUserDetail;