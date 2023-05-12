import {useSpring} from "@react-spring/web";

export const useAnimations = () => {
    const growUp = useSpring({
        from: { transform: 'scale(0.5)' },  // Start from no scale
        to: { transform: 'scale(1)' },  // Animate to natural scale
        config: { duration: 100 }  // Animation duration in milliseconds
    });

    return {growUp};
};

