import { useEffect } from "react";

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {

    const listener = (e) => {
      if(!ref.current || ref.current.contains(e.target)) {
        return;
      }
      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default useOnClickOutside;