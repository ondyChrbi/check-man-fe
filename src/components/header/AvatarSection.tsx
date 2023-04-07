import {meQuery, MeQuery} from "../../lib/graphql/meQuery";
import Avatar from "react-avatar";
import React from "react";
import {useQuery} from "@apollo/client";
import LoadingSpinner from "../loading/LoadingSpinner";

const AVATAR_DEFAULT_SIZE = '40';

interface Props {
    size?: string | number | undefined
}

const AvatarSection = ({size = AVATAR_DEFAULT_SIZE} : Props) => {
    const {loading, data} = useQuery<MeQuery>(meQuery);

    if (loading) {
        return <div className="w-full h-full flex flex-row items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    return <div className="flex flex-row justify-start items-center align-start py-5">
        <Avatar className="mt-0.5" name={data?.me.displayName} round={true} size={size.toString()} />
        <div className="flex-col justify-center align-middle items-center px-5">
            <p className="font-bold text-gray-200">{data?.me.displayName}</p>
            <p className="text-xs text-gray-400">{data?.me.mail}</p>
        </div>
    </div>;
};

export default AvatarSection;