import { useEffect, useRef } from "react";

const usePreviousValue = (value: boolean) => {
  const previousValueRef = useRef<boolean>();

  useEffect(() => {
    previousValueRef.current = value;
  }, [value]);

  return previousValueRef.current;
};

export default usePreviousValue;
