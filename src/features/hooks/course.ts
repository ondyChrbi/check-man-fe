import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import {useTranslation} from "react-i18next";
import {Course} from "../../lib/graphql/courseQuery";

export const useCourse = (course? : Course) => {
    const {t} = useTranslation();


    const resolver = yupResolver(yup.object({
        "name": yup.string()
            .max(256, t('course.action.name.error.max-length'))
            .required(t('course.action.name.error.required')),
        "stagId": yup.string()
            .max(128, t('course.action.stag-id.error.max-length'))
            .required(t('course.action.stag-id.error.required')),
    }));


    const defaultInputs = {
        name: (course && course.name) ?? "",
        stagId: (course && course.stagId) ?? "",
    };

    return {resolver, defaultInputs};
}