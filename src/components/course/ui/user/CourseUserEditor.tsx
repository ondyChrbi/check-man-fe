import React  from "react";
import CourseUserRolesList from "./CourseUserRolesList";
import {useMutation} from "@apollo/client";
import {CourseSemesterRole} from "../../../../lib/graphql/meQuery";
import {
    addCourseRole, AddCourseRoleMutation, AddCourseRoleVariables,
    appUser
} from "../../../../lib/graphql/appUserQuery";
import {showErrorToast} from "../../../editor/helpers";
import {PlusIcon} from "@heroicons/react/24/solid";

interface Props {
    semesterId: number | string,
    userId: number | string,
    availableRoles?: Array<CourseSemesterRole>
    onRoleClicked?: (role : CourseSemesterRole) => void | Promise<void>
}

const CourseUserEditor = ({semesterId, userId, availableRoles = [], onRoleClicked} : Props) => {

    const [addRole, {loading : addRoleLoading}] = useMutation<AddCourseRoleMutation, AddCourseRoleVariables>(addCourseRole, {
        onError: (error) => {
            showErrorToast(error);
        },
        refetchQueries: [{query: appUser, variables: {semesterId: semesterId, id: userId}}]
    });

    const roleAddHandle = async (role: CourseSemesterRole) => {
        if (!addRoleLoading) {
            await addRole({variables: {appUserId: userId, semesterId, roleId: role.id}});
            if (onRoleClicked) {
                await onRoleClicked(role);
            }
        }
    }

    return <div className="flex flex-col w-full">
        <CourseUserForm roles={availableRoles} onRoleAdd={roleAddHandle} />
    </div>
}

const ICON_WIDTH = 20;
const ICON_HEIGHT = 20;

interface CourseUserFormProps {
    roles?: Array<CourseSemesterRole>
    onRoleAdd?: (role: CourseSemesterRole) => void | Promise<void>
}

const CourseUserForm = ({roles = [], onRoleAdd} : CourseUserFormProps) => {
    const chipClickedHandle = async (course : CourseSemesterRole) => {
        if (onRoleAdd) {
            await onRoleAdd(course);
        }
    }

    return <>
        <CourseUserRolesList roles={roles} onRoleClicked={chipClickedHandle}
                             itemIcon={<PlusIcon style={{margin: '0.05em'}} width={ICON_WIDTH} height={ICON_HEIGHT} />}
        />
    </>
}

export default CourseUserEditor;