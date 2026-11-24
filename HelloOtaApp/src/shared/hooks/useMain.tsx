import React from "react";
import { Main } from "../class/Main";

export default function useMain<T extends Main>(factory: () => T) {
    const [, forceRender] = React.useReducer((v) => v + 1, 0);

    const mainRef = React.useRef<T | null>(null);

    if (mainRef.current === null) {
        mainRef.current = factory()
    }

    const main = mainRef.current;

    React.useEffect(() => {
        main.im_SetForceRender(forceRender);
        main.im_Mounted();

        return () => {
            main.im_UnMounted();
        };
    }, [main]);

    return main;
}
