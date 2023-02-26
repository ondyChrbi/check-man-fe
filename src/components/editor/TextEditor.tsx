import '@wangeditor/editor/dist/css/style.css'
import './TextEditor.css'

import {i18nChangeLanguage, IDomEditor, IEditorConfig, IToolbarConfig} from "@wangeditor/editor";
import React, {useState} from "react";
import {Editor, Toolbar} from "@wangeditor/editor-for-react";
import {InputProps} from "./input/Input";
import {Control, Controller} from "react-hook-form";

export interface Props extends InputProps {
    control?: Control<any>;
    required?: boolean | undefined;
    defaultValue?: string
}

const TextEditor = ({propertyName, required = false, label, control, defaultValue = ""}: Props) => {
    const [editor, setEditor] = useState<IDomEditor | null>(null)
    const [editorState, setEditorState] = useState<string | undefined>(defaultValue)

    const editorValueChangeHandler = (editor: IDomEditor | null) => {
        setEditorState(editor?.getHtml());
    }

    i18nChangeLanguage('en')

    return <>
        <label htmlFor={propertyName}>{label}</label>
        <div
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-fit pb-2.5 ">
            <Controller control={control}
                        name={propertyName}
                        rules={{required}}
                        render={({field: {onChange}}) =>
                            <div className="z-50">
                                <Toolbar editor={editor} defaultConfig={toolbarConfig} mode={DEFAULT_MODE}
                                         style={{paddingLeft: '0.5rem', paddingRight: '0.5rem', paddingTop: '0.5rem'}}/>
                                <Editor defaultConfig={editorConfig} value={editorState} onCreated={setEditor}
                                        onChange={(editor) => {
                                            editorValueChangeHandler(editor);
                                            onChange(editor?.getHtml())
                                        }
                                        } mode={DEFAULT_MODE}
                                        style={{paddingLeft: '0.5rem', paddingRight: '0.5rem'}}/>
                            </div>
                        }
            />
        </div>
    </>
}

const toolbarConfig: Partial<IToolbarConfig> = {}
toolbarConfig.toolbarKeys = [
    'headerSelect',
    '|',
    'bold', 'italic'
]

const editorConfig: Partial<IEditorConfig> = {
    placeholder: 'Type here...',
}

const DEFAULT_MODE = "default"

export default TextEditor;