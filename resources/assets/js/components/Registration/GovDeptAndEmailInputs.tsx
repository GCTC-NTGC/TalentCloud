import React, { useState } from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import ReactDOM from "react-dom";
import { Department } from "../../models/types";
import Select, { SelectOption } from "../Select";
import IntlContainer from "../../IntlContainer";
import Input from "../Input";

interface GovDeptAndEmailInputsProps {
  departments: Department[];
  prevDeptId?: number;
  prevGovEmail?: string;
}

export const GovDeptAndEmailInputs: React.FunctionComponent<
  GovDeptAndEmailInputsProps & InjectedIntlProps
> = ({ departments, prevDeptId, prevGovEmail, intl }): React.ReactElement => {
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw new Error("Unknown intl.locale");
  }

  const [deptId, setDeptId] = useState<number | null>(
    prevDeptId !== undefined ? prevDeptId : null,
  );
  const [govEmail, setGovEmail] = useState(prevGovEmail || "");

  const NOT_IN_GOV = 0;
  const notInGovOption = { value: NOT_IN_GOV, label: "Not in Government" };
  const options = [
    notInGovOption,
    ...departments.map(
      (department): SelectOption => ({
        value: department.id,
        label: department[locale].name,
      }),
    ),
  ];

  const getEventDeptId = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): number | null =>
    event.target.value !== "" ? Number(event.target.value) : null;
  return (
    <>
      <Select
        id="department"
        name="department"
        label="Government Department"
        required
        nullSelection="Select a department"
        selected={deptId}
        options={options}
        onChange={(event): void => setDeptId(getEventDeptId(event))}
      />
      {deptId !== null && deptId !== NOT_IN_GOV && (
        <Input
          id="gov_email"
          name="gov_email"
          label="Your Government Email"
          required
          value={govEmail}
          onChange={(event): void => setGovEmail(event.target.value)}
        />
      )}
    </>
  );
};

const GovDeptAndEmailInputsIntl = injectIntl(GovDeptAndEmailInputs);

if (document.getElementById("gov-dept-and-email-inputs")) {
  const container = document.getElementById(
    "gov-dept-and-email-inputs",
  ) as HTMLElement;
  if (container !== null && container.hasAttribute("data-departments")) {
    const departments = JSON.parse(container.getAttribute(
      "data-departments",
    ) as string);
    const prevDeptData = container.getAttribute("data-prev-department");
    const prevDept =
      prevDeptData && !Number.isNaN(Number(prevDeptData))
        ? Number(prevDeptData)
        : undefined;
    const prevGovEmail =
      container.getAttribute("data-prev-gov-email") || undefined;
    const locale = document.documentElement.lang;
    ReactDOM.render(
      <IntlContainer locale={locale}>
        <GovDeptAndEmailInputsIntl
          departments={departments}
          prevDeptId={prevDept}
          prevGovEmail={prevGovEmail}
        />
      </IntlContainer>,
      container,
    );
  }
}

export default GovDeptAndEmailInputsIntl;
