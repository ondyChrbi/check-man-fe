import {ApolloError} from "@apollo/client";
import {toast} from "react-toastify";

export const ChallengeEditorOptions = {
    options: ['inline', 'blockType', 'fontSize', 'colorPicker', 'link', 'emoji'],
    inline: {
        inDropdown: false,
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
        options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
        bold: {className: undefined},
        italic: {className: undefined},
        underline: {className: undefined},
        strikethrough: {className: undefined},
        monospace: {className: undefined},
        superscript: {className: undefined},
        subscript: {className: undefined},
    },
    blockType: {
        inDropdown: false,
        options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
    },
    colorPicker: {
        inDropdown: false,
        className: undefined,
        component: undefined,
        popupClassName: undefined,
        colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
            'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
            'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
            'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
            'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
            'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'],
    }, link: {
        inDropdown: false,
        className: undefined,
        component: undefined,
        popupClassName: undefined,
        dropdownClassName: undefined,
        showOpenOptionOnHover: true,
        defaultTargetOption: '_self',
        options: ['link', 'unlink'],
        link: {className: undefined},
        unlink: {className: undefined},
        linkCallback: undefined
    },
}

export const showErrorToast = (error: any) => {
    if (error instanceof ApolloError) {
        toast.error(error.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
    }
}

export const showSuccessToast = (successMessage: any) => toast.success(successMessage, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
});

