import {useState} from "react";
import {TestingModule} from "../../../../../../features/challenge/test";
import TestingModuleIItem from "./TestingModuleIItem";

interface Props {
    items: Array<TestingModule>
    onItemClick: (item: TestingModule) => void | Promise<void>
    selected?: TestingModule
}

const TestingModuleForm = ({items, selected, onItemClick = () => {}} : Props) => {

    const itemClickHandle = (item : TestingModule) => {
        onItemClick(item);
    };

    return (<ul className="flex flex-wrap justify-start items-start w-full">
                {items.map((item) => (
                    <TestingModuleIItem active={selected === item} key={item.key} module={item} onClick={itemClickHandle} />
                ))}
    </ul>
    );
}

export default TestingModuleForm;