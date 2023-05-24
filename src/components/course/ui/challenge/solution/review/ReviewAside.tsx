import React, {useState} from "react";
import CollapsibleButton from "../../../../../CollapsibleButton";

const HIDDEN = '-18rem';
const OPEN = '0rem';

interface Props {
    children: React.ReactNode
}

const ReviewAside = ({children}: Props) => {
    const [isOpen, setIsOpen] = useState(true);

    const collapsibleButtonClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setIsOpen(!isOpen);
    }

    return <aside className="flex flex-row justify-start items-start md:w-80 h-full fixed bg-gray-600 z-10"
                  style={{left: (isOpen) ? OPEN : HIDDEN}}>
        <menu className="w-72 h-full">
            <div className="w-72 absolute top-0 left-0 overflow-y-auto z-0 h-full">
                {children}
            </div>
        </menu>

        <CollapsibleButton onClick={collapsibleButtonClickHandler} open={isOpen}/>
    </aside>
}

export default ReviewAside