import LoadingSpinner from "../LoadingSpinner";
import React from "react";

const ErrorLoader = () => {
    return <div className="w-full h-fit flex flex-row items-center justify-center">
        <LoadingSpinner />
    </div>
}

export default ErrorLoader;