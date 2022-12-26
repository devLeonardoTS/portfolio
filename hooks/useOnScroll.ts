import { useState, useEffect } from "react";
import { Optional } from "../types/Nullables";

type UseOnScroll = (
    node: HTMLElement | null,
    args: Optional<{
        onScroll: () => Promise<void> | void;
        onStart: () => Promise<void> | void;
        onEnd: () => Promise<void> | void;
        runOnInit: boolean;
        delay: number;
    }>
) => Promise<void> | void;

const useOnScroll: UseOnScroll = (
    node,
    {
        onScroll = undefined,
        onStart = undefined,
        onEnd = undefined,
        runOnInit = false,
        delay = 150,
    }
) => {
    const [timer, setTimer] = useState<NodeJS.Timeout>();

    useEffect(() => {
        if (!onScroll) {
            return;
        }

        // console.log("[useOnScroll::Effect::handleOnScroll] - Ran");

        function handleOnScroll() {
            setTimer(
                setTimeout(() => {
                    onScroll?.();
                }, delay)
            );
        }

        if (runOnInit && !timer) {
            onScroll?.();
        }

        node?.addEventListener("scroll", handleOnScroll);

        return () => {
            node?.removeEventListener("scroll", handleOnScroll);
            clearTimeout(timer);
        };
    }, [delay, node, onScroll, runOnInit, timer]);

    useEffect(() => {
        if (!onStart) {
            return;
        }

        // console.log("[useOnScroll::Effect::handleOnStart] - Ran");

        function handleOnStart() {
            onStart?.();
        }

        node?.addEventListener("touchstart", handleOnStart);
        node?.addEventListener("mousedown", handleOnStart);

        return () => {
            node?.removeEventListener("touchstart", handleOnStart);
            node?.removeEventListener("mousedown", handleOnStart);
        };
    }, [node, onStart]);

    useEffect(() => {
        if (!onEnd) {
            return;
        }

        // console.log("[useOnScroll::Effect::handleOnEnd] - Ran");

        function handleOnEnd() {
            onEnd?.();
        }

        node?.addEventListener("touchend", handleOnEnd);
        node?.addEventListener("mouseup", handleOnEnd);

        return () => {
            node?.removeEventListener("touchend", handleOnEnd);
            node?.removeEventListener("mouseup", handleOnEnd);
        };
    }, [node, onEnd]);
};

export default useOnScroll;