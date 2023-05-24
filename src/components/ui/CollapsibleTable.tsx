import React from "react";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid";

interface Props<T, > {
    captions: Array<string>,
    offset?: number,
    max?: number,
    onPreviousPageClicked?: () => Promise<void> | void,
    onNextPageClicked?: () => Promise<void> | void,
    children?: React.ReactNode
}

const CollapsibleTable = <T, >({captions, max = 10, offset = 0,
                                   onPreviousPageClicked = () => {},
                                   onNextPageClicked = () => {},
                                   children = <></>
    }: Props<T>) => {

    const previousPageHandle = async () => {
        if (offset > 0 && onPreviousPageClicked) {
           await onPreviousPageClicked();
        }
    }

    const nextPageHandle = async () => {
        if (offset < max && onNextPageClicked) {
            await onNextPageClicked();
        }
    }

    return <>
        <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
                {captions.map(c => <th key={c} scope="col" className="px-6 py-3">{c}</th>)}
            </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>
        <div className="flex flex-row justify-between items-start align-middle px-3">
            <CollapsibleTableActionsFooter onPreviousClick={previousPageHandle} onNextClick={nextPageHandle}/>
            <div
                className="flex flex-row h-full py-1 text-sm">{offset} / {max}</div>
        </div>
    </>
}

const WIDTH = 15;
const HEIGHT = 15;

interface ReviewTableActionsFooterProps {
    onPreviousClick: () => void
    onNextClick: () => void
}

const CollapsibleTableActionsFooter = ({onPreviousClick, onNextClick}: ReviewTableActionsFooterProps) => {
    return <div className="flex flex-row">
        <button onClick={onPreviousClick}
                className="rounded-full w-fit hover:bg-teal-200 text-gray-800 font-bold py-2 p-2 inline-flex items-center">
            <ChevronLeftIcon width={WIDTH} height={HEIGHT}/>
        </button>
        <button onClick={onNextClick}
                className="rounded-full w-fit hover:bg-teal-200 text-gray-800 font-bold py-2 p-2 inline-flex items-center">
            <ChevronRightIcon width={WIDTH} height={HEIGHT}/>
        </button>
    </div>
}

export default CollapsibleTable;