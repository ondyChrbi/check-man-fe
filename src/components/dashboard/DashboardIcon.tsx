import React from "react";

interface Props {

}

const DashboardIcon = ({}: Props) => {
    return <div className="course-container flex flex-col mx-10 hover:cursor-pointer">
        <div className="flex flex-col justify-center course-icon rounded-3xl w-40 h-40 shadow hover:shadow-lg">

        </div>
        <div className="my-4">{}</div>
    </div>
}

export default DashboardIcon;