import Avatar from "react-avatar";
import {useQuery} from "@apollo/client";
import {meQuery, MeQuery} from "../lib/graphql/meQuery";
import {useTranslation} from "react-i18next";
import React from "react";
import {useAppDispatch} from "../features/storage/hooks";
import {disableJwtToken} from "../features/storage/storageSlice";

interface Props {
    size?: string | number | undefined
}

const AVATAR_DEFAULT_SIZE = '30';

const Header = ({size = AVATAR_DEFAULT_SIZE}: Props) => {
    const {t} = useTranslation()

    const {loading, data} = useQuery<MeQuery>(meQuery);
    const dispatch = useAppDispatch();

    const logout = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        dispatch(disableJwtToken());
    }

    return <div
        className="flex w-full grid grid-cols-2 shadow-lg hover:drop-shadow-xl bg-gray-100 px-5 sticky top-0 z-50 h-14">
        <div className="flex flex-col items-start justify-center">
            <h1 className="font-roboto text-teal-600 text-2xl uppercase font-bold text-center">{t('application.name')}</h1>
        </div>
        {!loading && data?.me.displayName &&
            <div className="flex flex-row justify-end p-2.5">
                <Avatar className="mt-0.5" name={data.me.displayName} round={true} size={size.toString()}/>
                <button type="button"
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 lg:px-5 py-1.5 mx-2 ark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        onClick={logout}>
                    {t('authentication.logout.button')}
                </button>
            </div>
        }
    </div>
}

export default Header;