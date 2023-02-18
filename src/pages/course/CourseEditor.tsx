import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import Input from "../../components/editor/input/Input";
import {Course, createCourse, CreateCourseMutation, CreateCourseVariables} from "../../lib/graphql/courseQuery";
import {useMutation} from "@apollo/client";
import {showErrorToast, showSuccessToast} from "../../components/editor/helpers";
import {ColorResult, TwitterPicker} from 'react-color'

interface Inputs {
    stagId: string
    name: string,
}

interface Props {
    course? : Course
}

const CourseEditor = ({course}: Props) => {
    const {t} = useTranslation();

    const [addCourse] = useMutation<CreateCourseMutation, CreateCourseVariables>(createCourse, {
        onError: (error) => {
            showErrorToast(error);
        },
        onCompleted: () => {
            showSuccessToast(t('common.message.publish'));
        },
    });

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

    const [template, setTemplate] = useState<string | undefined>();
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>({resolver});

    const submitHandler: SubmitHandler<Inputs> = async input => {
        await addCourse({variables: { input : {template, ...input}}})
    }

    const onColorPickerChange = (color: ColorResult) => {
        setTemplate(color.hex);
        debugger;
    };

    return <div className="flex flex-col w-full">
        <h1 className="my-7 text-gray-600 font-light text-4xl">{t('challenge.new.title')}</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className="my-5 grid grid-cols-1 md:grid-cols-2">
                <div className="m-0 lg:mr-5 mt-1 lg:mt-0 flex flex-col items-start justify-start">
                    <Input propertyName="name" label={t('course.action.name.name')}
                           placeHolder={t('course.action.name.place-holder')} register={register}
                           defaultValue={defaultInputs.name} error={errors.name?.message}
                    />
                </div>

                <div className="m-0 lg:ml-5 mt-1 lg:mt-0 flex flex-col items-start justify-start">
                    <Input propertyName="stagId" label={t('course.action.stag-id.name')}
                           placeHolder={t('course.action.name.place-holder')} register={register}
                           defaultValue={defaultInputs.stagId} error={errors.stagId?.message}
                    />
                </div>
            </div>
            <div className="my-5 grid grid-cols-1 md:grid-cols-2">
                <div className="m-0 lg:mr-5 mt-1 lg:mt-0 flex flex-col items-start justify-start">
                    <label>{t('course.action.template.name')}</label>
                    <TwitterPicker onChange={onColorPickerChange} />
                </div>
            </div>

            <div className="my-5 grid grid-cols-1">
                <div className="flex flex items-start justify-start w-full h-20">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{t('common.button.save')}</button>
                </div>
            </div>
        </form>
    </div>
}

export default CourseEditor