import {AppUser} from "../../../../lib/graphql/meQuery";
import {useTranslation} from "react-i18next";
import SearchInput from "../../../../components/editor/input/SearchInput";
import CollapsibleTable from "../../../../components/ui/CollapsibleTable";
import ChallengeAccessBody from "./ChallengeAccessBody";
import {AddActions, RemoveActions} from "./Actions";
import React from "react";

export enum ActionType {
    ADD = 'add',
    REMOVE = 'remove',
}

interface TableProps {
    challengeId: string | number;
    action?: ActionType;
    onSearch?: (searchValue: string) => void | Promise<void>;
    onAction?: () => void | Promise<void>;
    data?: Array<AppUser>;
}

const ToPermitTable = ({
                           challengeId, action = ActionType.ADD, onSearch, onAction = () => {
    }, data = []
                       }: TableProps) => {
    const {t} = useTranslation();

    const CAPTIONS = [
        t('challenge.review.editor.author.stag-id'),
        t('challenge.review.editor.author.mail'),
        t('challenge.review.editor.author.display-name'),
        t('challenge.review.editor.action.title'),
    ];

    return <>
        {onSearch && <SearchInput onSearch={onSearch}/>}
        <CollapsibleTable captions={CAPTIONS} max={data.length}>
            {data.map((user) =>
                <ChallengeAccessBody key={user.id} user={user}>
                    <>
                        {action === ActionType.ADD &&
                            <AddActions challengeId={challengeId} user={user} onAction={onAction}/>}
                        {action === ActionType.REMOVE &&
                            <RemoveActions challengeId={challengeId} user={user} onAction={onAction}/>}
                    </>
                </ChallengeAccessBody>
            )}
        </CollapsibleTable>
    </>
};

export default ToPermitTable;