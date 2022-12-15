import { RefObject, useEffect, useMemo, useState } from "react";

interface UseIntersectionObserverArgs extends IntersectionObserverInit {
    onEnter?: () => Promise<void> | void;
    onLeave?: () => Promise<void> | void;
}

const useIntersectionObserver = (elRef: RefObject<Element>, args?: UseIntersectionObserverArgs) => {

    const { threshold, root, rootMargin, onEnter, onLeave } = args || {};
    const [entry, setEntry] = useState<IntersectionObserverEntry>();

    useEffect(() => {
        const config: UseIntersectionObserverArgs = {
            threshold: threshold ? threshold : 0,
            root: root ? root : null,
            rootMargin: rootMargin ? rootMargin : '0%',
            onEnter: onEnter ? onEnter : () => { },
            onLeave: onLeave ? onLeave : () => { },
        }

        const isSupported = Boolean(window.IntersectionObserver);
        const node = elRef.current;
        if (!isSupported || !node) { return; }

        const observer = new IntersectionObserver(([entry]) => {
            setEntry(() => entry);

            if (Array.isArray(threshold)) {
                const exitThreshold = Math.min(...threshold);
                const enterThreshold = Math.max(...threshold);
                const ratio = entry.intersectionRatio;
                if (ratio <= exitThreshold) {
                    if (config.onLeave) { config.onLeave() }
                    return;
                }

                if (ratio >= enterThreshold) {
                    if (config.onEnter) { config.onEnter() }
                    return;
                }
            }

        }, config);

        observer.observe(node);
        // console.log("Connected");

        return () => {
            observer.disconnect();
            // console.log("Disconnected");
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { entry };

}

export default useIntersectionObserver;