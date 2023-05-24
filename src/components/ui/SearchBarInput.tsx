import React, { ChangeEvent, useState } from 'react';
import {useTranslation} from "react-i18next";

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
    buttonTitle?: string
}

const SearchBarInput: React.FC<SearchBarProps> = ({ onSearch, placeholder, buttonTitle }) => {
    const {t} = useTranslation();
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        onSearch(searchQuery);
    };

    return <div className="w-full flex justify-center">
        <div className="mb-3 w-full md:mx-12">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <input
                    type="search"
                    className="relative m-0 -mr-px block w-[30%] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                    value={searchQuery}
                    onChange={handleInputChange}
                    placeholder={placeholder || t('common.search.placeholder')}
                    aria-label="Search"
                    aria-describedby="button-addon3"/>
                <button
                    className="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                    type="button"
                    id="button-addon3"
                    onClick={handleSearch}
                    data-te-ripple-init="">
                    {buttonTitle || t('common.search.button')}
                </button>
            </div>
        </div>
    </div>
};

export default SearchBarInput;
