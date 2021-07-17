import { RefObject, useEffect } from "react";

type AnyEvent = MouseEvent | TouchEvent;

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T> ,
    handler: (event: AnyEvent) => void,
) {
    useEffect(() => {
        const listener = (event: AnyEvent) => {
            const element = ref?.current;
            // Do nothing if clicking ref's element or descendent elements
            if(!element|| element.contains(event.target as Node)) {
                return;
            }
            handler(event)
        };

        document.addEventListener("mousedown", listener);
        // document.addEventListener("touchstart", listener);
        
        return () => {
            document.addEventListener("mousedown", listener);
            // document.addEventListener("touchstart", listener);
        }
    }, [ref, handler]);
}