import {ChallengeKind} from "../../lib/graphql/challengeQuery";
import CounterInput from "../editor/input/CounterInput";
import {useTranslation} from "react-i18next";
import {useCourseRoles} from "../../features/authorization/hooks";
import {SemesterRole} from "../../lib/graphql/courseQuery";
import {useState} from "react";

interface Props {
    semesterId: number | string
}

interface Input {
    minOptional: number,
    minMandatory: number,
    minCredit: number,
    minExam: number,
}

const CourseSemesterRequirements = ({semesterId} : Props) => {
    const {t} = useTranslation();
    const {roles} = useCourseRoles(semesterId);

    const [input, setInput] = useState<Input>({
        minOptional: 0, minMandatory: 0, minCredit: 0, minExam: 0
    });

    const changeInputHandle = (name: ChallengeKind, value: number) => {
        debugger;

        switch (name) {
            case ChallengeKind.OPTIONAL:
                setInput({...input, minOptional: value});
                break;
            case ChallengeKind.MANDATORY:
                setInput({...input, minMandatory: value});
                break;
            case ChallengeKind.CREDIT:
                setInput({...input, minCredit: value});
                break;
            case ChallengeKind.EXAM:
                setInput({...input, minExam: value});
                break;
        }
    }

    return <div className="flex flex-col">
        <h1 className="mt-7 mb-10 text-gray-600 font-light text-4xl">{t('course.requirement.title')}</h1>
        <div className="flex flex-wrap justify-around md:justify-between items-end w-full">
            {Object.values(ChallengeKind).map((k) => <div
                className="flex flex-col w-fit text-center justify-center items-center align-middle mx-5">
                <h2 className={`w-fit font-roboto text-gray-700 text-center font-light text-md mb-3 font-bold ${textColorMap.get(k)}`}>
                    {t(`course.requirement.input.title.${k}`)}
                </h2>
                <CounterInput key={k} color={colorMap.get(k)} textColor={textColorMap.get(k)} name={k}
                              editable={roles.includes(SemesterRole.EDIT_COURSE)} onValueChange={changeInputHandle} />
            </div>)}
        </div>
    </div>
}

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

export default CourseSemesterRequirements;