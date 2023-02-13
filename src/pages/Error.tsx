import {useSearchParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

const MESSAGE_PARAM_NAME = "message";

const Error = () => {
    const {t} = useTranslation();

    const [searchParams] = useSearchParams();

    return <div className="flex flex-col w-full">
        {searchParams.get(MESSAGE_PARAM_NAME) || t('common.message.error.basic')}
    </div>
}

export default Error;