import {createPortal} from "react-dom";
import React from "react";
import {XMarkIcon} from "@heroicons/react/24/solid";

const ICON_WIDTH = 20;
const ICON_HEIGHT = 20;

interface Props {
    children?: React.ReactNode
    onCloseClicked?: () => void | Promise<void>
    title?: string
}

const CoolModal = ({children, onCloseClicked, title = ""}: Props) => {

    const closeClickedHandle = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if (onCloseClicked) {
            await onCloseClicked();
        }
    }

    return createPortal(
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeClickedHandle}></div>

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center p-5">
                    <div
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        {(title || onCloseClicked) && <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            {title && <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {title}
                            </h3>}
                            {onCloseClicked && <button type="button" onClick={closeClickedHandle}
                                                       className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                                       data-modal-hide="staticModal">
                                <XMarkIcon width={ICON_WIDTH} height={ICON_HEIGHT} />
                            </button>}
                        </div>}
                        {children}
                    </div>
                </div>
            </div>
        </div>
        ,document.getElementById("portal-root")!)
}

export default CoolModal;