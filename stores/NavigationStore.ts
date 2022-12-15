import { isEqual } from "lodash";
import create from "zustand";
import { Optional } from "../types/Nullables";

export type NavData = {
    name: string;
    href: string;
}

export type NavigationStoreState = Optional<{
    previous: NavData;
    current: NavData;
}>

export type NavigationStoreActions = {
    setNavCurrent: (data: NavData) => Promise<void> | void;
}

const NavigationStore = create<NavigationStoreState & NavigationStoreActions>((set, get) => {
    function setNavCurrent(data: NavData) {
        const current = get().current;
        if (isEqual(current, data)) { return; }

        set({ previous: current });
        set({ current: data });
    }

    return {
        previous: undefined,
        current: undefined,
        setNavCurrent,
    }
});

export default NavigationStore;
