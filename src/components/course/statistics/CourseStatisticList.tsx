import {FeedbackStatistics} from "../../../lib/graphql/statisticsQuery";
import {useTranslation} from "react-i18next";
import {HandThumbDownIcon, HandThumbUpIcon, MinusIcon, StarIcon} from "@heroicons/react/24/solid";
import React from "react";

interface Props {
    data?: Array<FeedbackStatistics>
}

const CourseStatisticList = ({data = []}: Props) => {
    const {t} = useTranslation();

    return <div className="w-full h-fit flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                            <th scope="col" className="px-6 py-4">{t('course.semester.statistics.list.feedback-type')}</th>
                            <th scope="col" className="px-6 py-4">{t('course.semester.statistics.list.description')}</th>
                            <th scope="col" className="px-6 py-4">{t('course.semester.statistics.list.count')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data?.map(v =>
                            <tr key={v.description} className="border-b dark:border-neutral-500">
                                {v.feedbackName && <td className="whitespace-nowrap px-6 py-4">{getIcon(v.feedbackName)}</td>}
                                <td className="whitespace-nowrap px-6 py-4 font-medium">{v.description}</td>
                                <td className="whitespace-nowrap px-6 py-4">{v.count}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
}

export const getIcon = (type: string) => {
    const color = '#000000';

    switch (type) {
        case 'EXTREMELY_POSITIVE':
            return <StarIcon color={color} width={WIDTH} height={HEIGHT}/>
        case 'POSITIVE':
            return <HandThumbUpIcon color={color} width={WIDTH} height={HEIGHT}/>
        case 'NEGATIVE':
            return <HandThumbDownIcon color={color} width={WIDTH} height={HEIGHT}/>
        default:
            return <MinusIcon color={color} width={WIDTH} height={HEIGHT}/>
    }
};

const WIDTH = 20;
const HEIGHT = 20;

export default CourseStatisticList;