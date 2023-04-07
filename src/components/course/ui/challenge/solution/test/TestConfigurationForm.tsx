import {useState} from "react";
import {TestConfiguration} from "../../../../../../features/challenge/test";

interface Props {
    items: Array<TestConfiguration>
    onItemClick: (item: TestConfiguration) => void | Promise<void>
}

const TestConfigurationForm = ({items, onItemClick = () => {}} : Props) => {
    const [selectedItem, setSelectedItem] = useState<TestConfiguration | null>(null);

    const itemClickHandle = (item : TestConfiguration) => {
        setSelectedItem(item);
        onItemClick(item);
    };

    return (
        <div>
            <h1>Selectable, Clickable Items</h1>
            <ul>
                {items.map((item, index) => (
                    <li
                        key={index}
                        style={{
                            backgroundColor: selectedItem === item ? 'lightblue' : 'white',
                            cursor: 'pointer',
                        }}
                        onClick={() => itemClickHandle(item)}
                    >
                        {JSON.stringify(item)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TestConfigurationForm;