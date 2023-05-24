import React from "react";
import {animated, useSpring} from "@react-spring/web";

interface Props {
    children: React.ReactNode,
    delay?: number | null | undefined,
    duration?: number | null | undefined,
}

const FadeIn = ({children, delay = 750, duration = 1100} : Props) => {
    const [props] = useSpring(
        () => ({
            delay,
            config: { duration },
            from: { opacity: 0 },
            to: { opacity: 1 },
        }),
        []
    )

    return <animated.div style={props}>{children}</animated.div>
}

export default FadeIn;