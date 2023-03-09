import {useTranslation} from "react-i18next";
import {animated, useSpring} from "@react-spring/web";

const RANDOM_TIP_MIN = 0
const RANDOM_TIP_MAX = 4


const LoadingSpinner = () => {
    const {t} = useTranslation();

    const [props] = useSpring(
        () => ({
            delay: 750,
            config: { duration: 1100 },
            from: { opacity: 0 },
            to: { opacity: 1 },
        }),
        []
    )

    const tip = t(`tip.${Math.floor(Math.random() * (RANDOM_TIP_MAX - RANDOM_TIP_MIN) + RANDOM_TIP_MIN)}`);

    return <div className="flex flex-col justify-center items-center align-middle w-full h-full" role="status">
        <svg className="inline mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)" fill="#2dd4bf" stroke="none"><path d="M440 989 c-75 -8 -156 -37 -211 -75 l-39 -27 0 -143 c0 -134 1 -144 23 -169 34 -40 103 -46 143 -12 l29 25 5 154 5 153 55 0 55 0 3 -138 c3 -164 -7 -208 -57 -258 -74 -75 -230 -80 -312 -12 -47 40 -61 83 -61 187 1 84 0 89 -13 66 -58 -101 -74 -272 -36 -390 102 -325 502 -450 774 -241 122 94 187 230 187 391 0 176 -79 322 -221 413 -105 66 -203 88 -329 76z m349 -545 c12 -15 21 -32 21 -39 0 -24 -41 -65 -66 -65 -31 0 -64 33 -64 65 0 32 33 65 64 65 15 0 33 -11 45 -26z m5 -206 c21 -30 20 -54 -4 -78 -24 -24 -67 -26 -92 -3 -40 36 -9 103 47 103 24 0 39 -7 49 -22z"></path></g>
        </svg>
        <animated.div style={props} className="w-full max-w-sm mt-9 text-center">
            <p className="font-roboto text-gray-400 text-sm text-center pb-7">{tip}</p>
        </animated.div>
    </div>
}

export default LoadingSpinner;