import React, {useMemo} from 'react'
import {createEditor, BaseEditor} from 'slate'
import {Slate, Editable, withReact, ReactEditor} from 'slate-react'
import {HistoryEditor, withHistory} from 'slate-history'
import {Descendant} from 'slate'
import {useTranslation} from "react-i18next";

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string; bold?: true }

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor & HistoryEditor
        Element: CustomElement
        Text: CustomText
    }
}

interface Props {
}

const ChallengeEditor = ({}: Props) => {
    const {t} = useTranslation();
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    const initialValue: Descendant[] = [
        {
            type: 'paragraph',
            children: [
                {text: t('challenge.action.text.place-holder')},
            ],
        },
    ];


    return <>
        <form>

            <div>
                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {t('challenge.action.text.name')}
                </label>
                <div className="h-52 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <Slate editor={editor} value={initialValue}>
                        <Editable/>
                    </Slate>
                </div>
            </div>
            <div className="flex flex items-start justify-start w-full h-20">
                <button>{t('common.button.publish')}</button>
            </div>
        </form>
    </>
}

export default ChallengeEditor;