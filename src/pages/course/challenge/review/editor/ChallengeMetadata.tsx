import {useTranslation} from "react-i18next";
import {toFormattedDateTime} from "../../../../../features/helper";
import MetadataTable from "../../../../../components/ui/MetadataTable";
import React from "react";
import {Challenge} from "../../../../../lib/graphql/challengeQuery";

export interface Props {
    challenge: Challenge
}

const ChallengeMetadata = ({challenge}: Props) => {
    const {t} = useTranslation();

    const data = [
        [t('challenge.id'), challenge.id.toString()],
        [t('challenge.name'), challenge.name],
        [t('challenge.start-date'), toFormattedDateTime(challenge.startDate)],
        [t('challenge.deadline-date'), toFormattedDateTime(challenge.deadlineDate)],
    ];

    return <>
        <MetadataTable title={t('challenge.metadata.title')} data={data} />
    </>
}

export default ChallengeMetadata;