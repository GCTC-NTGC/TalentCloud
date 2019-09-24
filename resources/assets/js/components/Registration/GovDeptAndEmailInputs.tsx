import React, { useState } from "react";
import { InjectedIntlProps, injectIntl, defineMessages } from "react-intl";
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

const messages = defineMessages({
  notInGov: {
    id: "govDeptAndEmail.notInGov",
    defaultMessage: "Not in Government",
    description:
      "The user's option to state that they don't have a government email.",
  },
  department: {
    id: "govDeptAndEmail.departmentLabel",
    defaultMessage: "Government Department",
    description: "Label for the Government Department input field.",
  },
  departmentNullSelection: {
    id: "govDeptAndEmail.departmentNullSelection",
    defaultMessage: "Select a Department",
    description:
      "Null selection option for the Government Department input field.",
  },
  govEmail: {
    id: "govDeptAndEmail.govEmailLabel",
    defaultMessage: "Your Government Email",
    description: "Label for government email input field.",
  },
});

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
  const notInGovOption = {
    value: NOT_IN_GOV,
    label: intl.formatMessage(messages.notInGov),
  };
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
        label={intl.formatMessage(messages.department)}
        required
        nullSelection={intl.formatMessage(messages.departmentNullSelection)}
        selected={deptId}
        options={options}
        onChange={(event): void => setDeptId(getEventDeptId(event))}
      />
      {deptId !== null && deptId !== NOT_IN_GOV && (
        <Input
          id="gov_email"
          name="gov_email"
          label={intl.formatMessage(messages.govEmail)}
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
