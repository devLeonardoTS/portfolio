import { isNil } from "lodash";
import { NavData } from "../types/NavData";
import { Optional } from "../types/Nullables";

type CreateNavDataArgs = Optional<NavData>;

function createNavData(args?: CreateNavDataArgs) {
    const input = args || {};
    const output: NavData = {
        name: isNil(input.name) ? "" : input.name,
        href: isNil(input.href) ? "" : input.href,
    }
    return output;
}

export default createNavData;