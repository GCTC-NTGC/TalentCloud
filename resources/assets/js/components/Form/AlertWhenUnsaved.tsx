import React, { useEffect } from "react";
import { useFormikContext } from "formik";

// Kinda weird "empty" component that hooks into Formik's
// context, listens to the 'dirty' prop, and registers
// a beforeunload listener to fire if a user attempts to
// leave with unsaved work.
// https://github.com/jaredpalmer/formik/issues/1657#issuecomment-509388871
const AlertWhenUnsaved = (): React.ReactElement => {
  const { dirty } = useFormikContext();
  const handleUnload = (event: BeforeUnloadEvent): void => {
    event.preventDefault();
    event.returnValue = "Are you sure you want to leave with unsaved changes?";
  };

  useEffect(() => {
    if (dirty) {
      window.addEventListener("beforeunload", handleUnload);
    }
    return (): void => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [dirty]);

  return <></>;
};

export default AlertWhenUnsaved;
