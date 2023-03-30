import {ChallengeKind} from "../../lib/graphql/challengeQuery";
import CounterInput from "../editor/input/CounterInput";
import {useTranslation} from "react-i18next";
import {
    CourseRequirements,
    editSemesterRequirements,
    EditSemesterRequirementsMutation,
    EditSemesterRequirementsVariables,
    Semester
} from "../../lib/graphql/courseQuery";
import {useState} from "react";
import {useMutation} from "@apollo/client";
import {showErrorToast, showSuccessToast} from "../editor/helpers";

interface Props {
    semester: Semester
    requirements?: CourseRequirements | undefined | null
    editable?: boolean
}

const CourseSemesterRequirements = ({semester, requirements = INIT_REQUIREMENTS, editable = false}: Props) => {
    const {t} = useTranslation();

    const [edit] = useMutation<EditSemesterRequirementsMutation, EditSemesterRequirementsVariables>(editSemesterRequirements, {
        onError: (error) => {
            showErrorToast(error);
        },
        onCompleted: () => {
            showSuccessToast(t('common.message.publish'));
        },
    })

    const [formValues, setFormValues] = useState(requirements || INIT_REQUIREMENTS);

    const changeInputHandle = async (name: ChallengeKind, value: number) => {
        //@ts-ignore
        const {__typename, ...input} = updateFormValue(formValues, name, value);

        setFormValues({...input});
        await edit({variables: {semesterId: semester.id, input}});
    }

    return <div className="flex flex-col">
        <h1 className="mt-7 mb-10 text-gray-600 font-light text-4xl">{t('course.requirement.title')}</h1>
        <div className="flex flex-wrap justify-around md:justify-between items-end w-full">
            {Object.values(ChallengeKind).filter((k) => isDisplayable(editable, k, formValues)).map((k) =>
                <div key={k}
                    className="flex flex-col w-fit text-center justify-center items-center align-middle mx-5">
                    <h2 className={`w-fit font-roboto text-gray-700 text-center font-light text-md mb-3 font-bold ${textColorMap.get(k)}`}>
                        {t(`course.requirement.input.title.${k}`)}
                    </h2>
                    <CounterInput color={colorMap.get(k)} textColor={textColorMap.get(k)} name={k}
                                  current={getCurrent(k, formValues)}
                                  editable={editable} onValueChange={changeInputHandle}/>
                </div>)}
        </div>
    </div>
}

const updateFormValue = (formValues: CourseRequirements, name: ChallengeKind, value: number) => {
    let input = {...formValues};

    switch (name) {
        case ChallengeKind.OPTIONAL:
            input = {...input, minOptional: value};
            break;
        case ChallengeKind.MANDATORY:
            input = {...input, minMandatory: value};
            break;
        case ChallengeKind.CREDIT:
            input = {...input, minCredit: value};
            break;
        case ChallengeKind.EXAM:
            input = {...input, minExam: value};
            break;
    }
    return input;
}

const getCurrent = (kind: ChallengeKind, requirements: CourseRequirements) => {
    switch (kind) {
        case ChallengeKind.OPTIONAL:
            return requirements.minOptional;
        case ChallengeKind.MANDATORY:
            return requirements.minMandatory;
        case ChallengeKind.CREDIT:
            return requirements.minCredit;
        default:
            return requirements.minExam;
    }
};

const colorMap = new Map();
colorMap.set(ChallengeKind.OPTIONAL, 'border-teal-300');
colorMap.set(ChallengeKind.MANDATORY, 'border-teal-500');
colorMap.set(ChallengeKind.CREDIT, 'border-teal-700');
colorMap.set(ChallengeKind.EXAM, 'border-teal-800');

const textColorMap = new Map();
textColorMap.set(ChallengeKind.OPTIONAL, 'text-teal-400');
textColorMap.set(ChallengeKind.MANDATORY, 'text-teal-600');
textColorMap.set(ChallengeKind.CREDIT, 'text-teal-800');
textColorMap.set(ChallengeKind.EXAM, 'text-teal-900');

const INIT_REQUIREMENTS: CourseRequirements = {
    minOptional: 0,
    minMandatory: 0,
    minCredit: 0,
    minExam: 0
};

const isDisplayable = (editable: boolean | undefined, challengeKind: ChallengeKind, formValues: CourseRequirements) => {
    return editable || getCurrent(challengeKind, formValues) > 0;
}


export default CourseSemesterRequirements;