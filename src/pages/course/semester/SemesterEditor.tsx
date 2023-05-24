import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import {
    createSemester,
    CreateSemesterMutation,
    CreateSemesterVariables,
    Semester
} from "../../../lib/graphql/courseQuery";
import {useTranslation} from "react-i18next";
import {SubmitHandler, useForm} from "react-hook-form";
import Input from "../../../components/editor/input/Input";
import React from "react";
import DateTime from "../../../components/editor/input/DateTime";
import {useMutation} from "@apollo/client";
import {showErrorToast, showSuccessToast} from "../../../components/editor/helpers";
import {useParams} from "react-router-dom";

interface Inputs {
    note: string,
    dateStart: string,
    dateEnd: string,
}

interface Props {
    semester?: Semester
}

const SemesterEditor = ({semester} : Props) => {
    const {courseId} = useParams<'courseId'>();
    const {t} = useTranslation();

    const [addSemester] = useMutation<CreateSemesterMutation, CreateSemesterVariables>(createSemester, {
        onError: (error) => {
            showErrorToast(error);
        },
        onCompleted: () => {
            showSuccessToast(t('common.message.publish'));
        }
    });

    const resolver = yupResolver(yup.object({
        "note": yup.string()
            .max(1024, t('course.semester.action.note.error.max-length')),
        "dateStart": yup.date()
            .required(t('course.semester.action.dateStart.error.required')),
        "dateEnd": yup.date()
            .required(t('course.semester.action.dateEnd.error.required')),
    }));

    const defaultInputs = {
        note: (semester && semester.note) ?? "",
        dateStart: (semester && semester.dateStart) ?? "",
        dateEnd: (semester && semester.dateEnd) ?? "",
    };

    const {register, handleSubmit, control, formState: {errors}} = useForm<Inputs>({resolver});

    const submitHandler: SubmitHandler<Inputs> = async input => {
        await addSemester({variables: {courseId : courseId!, input}});
    }

    return <div className="flex flex-col w-full">
        <h1 className="my-7 text-gray-600 font-light text-4xl">{t('course.semester.new.title')}</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className="my-5 grid grid-cols-1">
                <div className="m-0 lg:mr-5 mt-1 lg:mt-0 flex flex-col items-start justify-start">
                    <Input propertyName="note" label={t('course.semester.action.note.name')}
                           placeHolder={t('course.semester.action.note.place-holder')} register={register}
                           defaultValue={defaultInputs.note} error={errors.note?.message}
                    />
                </div>
            </div>

            <div className="my-5 grid grid-cols-1 md:grid-cols-2">
                <div className="m-0 lg:mr-5 mt-1 lg:mt-0 flex flex-col items-start justify-start">
                    <DateTime propertyName="dateStart" defaultValue={defaultInputs.dateStart} register={register}
                              label={t('course.semester.action.dateStart.name')} control={control}
                    />
                    <div>{errors.dateStart?.message}</div>
                </div>

                <div className="m-0 lg:ml-5 mt-1 lg:mt-0 flex flex-col items-start justify-start">
                    <DateTime propertyName="dateEnd" defaultValue={defaultInputs.dateEnd} register={register}
                              label={t('course.semester.action.dateEnd.name')} control={control}
                    />
                    <div>{errors.dateEnd?.message}</div>
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

export default SemesterEditor;