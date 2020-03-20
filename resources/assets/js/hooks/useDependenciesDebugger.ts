import { useRef, useMemo } from "react";

const compareInputs = (inputKeys, oldInputs, newInputs) => {
  inputKeys.forEach(key => {
    const oldInput = oldInputs[key];
    const newInput = newInputs[key];
    if (oldInput !== newInput) {
      console.log("change detected", key, "old:", oldInput, "new:", newInput);
    }
  });
};

const useDependenciesDebugger = inputs => {
  const oldInputsRef = useRef(inputs);
  const inputValuesArray = Object.values(inputs);
  const inputKeysArray = Object.keys(inputs);
  useMemo(() => {
    const oldInputs = oldInputsRef.current;

    compareInputs(inputKeysArray, oldInputs, inputs);

    oldInputsRef.current = inputs;
  }, inputValuesArray); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useDependenciesDebugger;
