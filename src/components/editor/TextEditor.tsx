import '@wangeditor/editor/dist/css/style.css'
import './TextEditor.css'

import {i18nChangeLanguage, IDomEditor, IEditorConfig, IToolbarConfig} from "@wangeditor/editor";
import {useState} from "react";
import {Editor, Toolbar} from "@wangeditor/editor-for-react";

interface Props {
    onChange: (event: any) => void
}

const TextEditor = ({onChange} : Props) => {
    const [editor, setEditor] = useState<IDomEditor | null>(null)
    const [editorState, setEditorState] = useState<string | undefined>('<p>hello</p>')

    const editorValueChangeHandler = (editor: IDomEditor | null) => {
        console.log(editor?.getHtml())

        setEditorState(editor?.getHtml())
        onChange(editor?.getHtml())
    }

    i18nChangeLanguage('en')

    return <div className="z-50">
        <Toolbar editor={editor} defaultConfig={toolbarConfig} mode={DEFAULT_MODE} style={{paddingLeft: '0.5rem', paddingRight: '0.5rem', paddingTop: '0.5rem'}} />
        <Editor defaultConfig={editorConfig} value={editorState} onCreated={setEditor} onChange={editorValueChangeHandler} mode={DEFAULT_MODE} style={{paddingLeft: '0.5rem', paddingRight: '0.5rem'}} />
    </div>
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