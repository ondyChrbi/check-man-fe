import {getTestModuleIcon, TestingModule} from "../../../../../../features/challenge/test";
import React from "react";

interface Props {
    module: TestingModule
    active?: boolean
    children?: any
    onClick?: (item: TestingModule) => void | Promise<void>
}

const TestingModuleIItem = ({
                                module,
                                active = false,
                                children = <></>,
                                onClick = () => {}
                            }: Props) => {
    const clickHandle = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        onClick(module);
    }

    return <li className={`flex flex-col justify-center items-center align-middle w-52 h-fit p-5 rounded-md hover:bg-gray-500 ${active ? 'bg-gray-500' : 'bg-gray-400 cursor-pointer'}`} onClick={clickHandle}>
        <object className="w-10 h-10 mb-2.5 fill-white" data={getTestModuleIcon(module)} type="image/svg+xml"/>
        <p className="font-bold text-center text-white">{module.name}</p>
        {children}
    </li>
}

export default TestingModuleIItem;