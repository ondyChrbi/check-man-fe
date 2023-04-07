import {useTranslation} from "react-i18next";
import {useAppDispatch} from "../../features/storage/hooks";
import React from "react";
import {disableJwtToken} from "../../features/storage/storageSlice";

const LogoutButton = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const logout = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        dispatch(disableJwtToken());
    }

    return <button type="button"
                   className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 lg:px-5 py-1.5 mx-2 ark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                   onClick={logout}>
        {t('authentication.logout.button')}
    </button>
}

export default LogoutButton;