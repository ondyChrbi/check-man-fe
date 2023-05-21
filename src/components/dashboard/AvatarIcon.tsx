import {useQuery} from "@apollo/client";
import {meQuery, MeQuery} from "../../lib/graphql/meQuery";
import LoadingSpinner from "../loading/LoadingSpinner";
import Avatar from "react-avatar";
import React from "react";

const AVATAR_DEFAULT_SIZE = '60';

const AvatarIcon = () => {
    const {loading, data} = useQuery<MeQuery>(meQuery);

    if (loading) {
        return <div className="w-full h-full flex flex-row items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    return <div className="flex flex-row p-5 justify-center items-center align-middle w-20 h-20">
        <Avatar className="mr-5" name={data?.me.displayName} round={true} size={AVATAR_DEFAULT_SIZE} textSizeRatio={1} />
        <div className="my-4 text-center font-bold text-gray-600 leading-5">{data?.me.displayName}</div>
    </div>
}

export default AvatarIcon;