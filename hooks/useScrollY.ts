import { useEffect, useState } from "react";

type ScrollYDirections = "none" | "up" | "down";

type ScrollYDirectionsArgs = {
    onScrollUp?: () => Promise<void> | void;
    onScrollDown?: () => Promise<void> | void;
};

const useScrollY = (args?: ScrollYDirectionsArgs) => {
    const { onScrollUp, onScrollDown } = args || {};
    const [lastScrollTop, setLastScrollTop] = useState<number>(0);
    const [direction, setDirection] = useState<ScrollYDirections>("none");

    useEffect(() => {
        setLastScrollTop(() => window.scrollY);

        function getScrollYDirection() {
            const scrollTop = document.documentElement.scrollTop;

            const isScrollingDown = lastScrollTop < scrollTop;
            const isScrollingUp = lastScrollTop > scrollTop;

            if (isScrollingDown) {
                // console.log("User scrolling down...");
                setDirection(() => "down");
                if (onScrollDown) {
                    onScrollDown();
                }
            }

            if (isScrollingUp) {
                // console.log("User scrolling up");
                setDirection(() => "up");
                if (onScrollUp) {
                    onScrollUp();
                }
            }

            setLastScrollTop(() => (scrollTop <= 0 ? 0 : scrollTop));
        }

        window.addEventListener("scroll", getScrollYDirection);

        return () => window.removeEventListener("scroll", getScrollYDirection);

    }, [lastScrollTop, onScrollDown, onScrollUp]);

    return {
        direction,
        lastScrollTop,
    };
};

export default useScrollY;