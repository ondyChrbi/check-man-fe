import React from "react";

interface Props {
    onAction?: () => void | Promise<void>;
    children?: JSX.Element
}

export const ChallengeAccessBodyActions = ({onAction = () => {}, children = <></>} : Props) => {
    const addUserClickHandle = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        await onAction();
    };

    return <>
        <button onClick={addUserClickHandle}
                className="rounded-full w-fit hover:bg-teal-200 text-gray-800 font-bold py-2 p-2 inline-flex items-center">
            {children}
        </button>
    </>
};

export default ChallengeAccessBodyActions;
