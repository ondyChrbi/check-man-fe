
import React from "react";
import Logo from "./Logo";
import AvatarSection from "./AvatarSection";

interface Props {
    size?: string | number | undefined
    showLogo?: boolean | null | undefined
}

const Header = ({showLogo = true}: Props) => {
    return <div className="flex flex-col w-full justify-between top-0 z-50 h-14">
        {showLogo && <Logo/>}
        <div className="border-b-0 border-gray-600">
            <AvatarSection />
        </div>
    </div>
}

export default Header;