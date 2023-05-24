import {AppUser} from "../../../../../lib/graphql/meQuery";
import {useTranslation} from "react-i18next";
import {toFormattedDate, toFormattedDateTime} from "../../../../../features/helper";
import MetadataTable from "../../../../../components/ui/MetadataTable";
import React from "react";

export interface Props {
    author: AppUser
}

const AuthorMetadata = ({author}: Props) => {
    const {t} = useTranslation();

    const data = [
        [t('course.users.manager.stag-id'), author.stagId || ""],
        [t('course.users.manager.mail'), author.mail || ""],
        [t('course.users.manager.display-name'), author.displayName || ""],
        [t('course.users.manager.registration-date'), toFormattedDate(author.registrationDate)],
        [t('course.users.manager.lastAccess-date'), toFormattedDateTime(author.lastAccessDate)],
    ];

    return <>
        <MetadataTable title={t('course.users.metadata.title')} data={data} />
    </>
}

export default AuthorMetadata;