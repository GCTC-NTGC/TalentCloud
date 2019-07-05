import React, { useState, useRef } from "react";
import {
  injectIntl,
  InjectedIntlProps,
  FormattedMessage,
  defineMessages,
} from "react-intl";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ProgressTracker from "../ProgressTracker/ProgressTracker";
import { items } from "../ProgressTracker/fixtures/progressItems";
import { Job } from "../../models/types";
import { emptyJob } from "../../models/jobUtil";
import JobImpactPreview from "./JobImpactPreview";
import Modal from "../Modal";
import TextArea from "../Forms/TextArea";
import { validationMessages } from "../Form/Messages";

interface JobBuilderImpactProps {
  department?: string;
  job: Job | null;
  // Function to run after successful form validation.
  // It must return true if the submission was succesful, false otherwise.
  handleSubmit: (values: Job) => Promise<boolean>;
  // Function to run when modal cancel is clicked.
  handleModalCancel: () => void;
  // Function to run when modal confirm is clicked.
  handleModalConfirm: () => void;
  // Parent element to place the modal contents within (uses React Portal).
  modalParent: Element;
}

interface JobImpactValues {
  teamImpact: string;
  hireImpact: string;
}

const messages = defineMessages({
  hireLabel: {
    id: "jobBuilder.impact.hireLabel",
    defaultMessage: "Hire Impact Statement",
    description: "Label for hire impact statement text area",
  },
  teamLabel: {
    id: "jobBuilder.impact.teamLabel",
    defaultMessage: "Team Impact Statement",
    description: "Label for team impact statement text area",
  },
  hirePlaceholder: {
    id: "jobBuilder.impact.hirePlaceholder",
    defaultMessage: "Remember, don't use Government speak...",
    description: "",
  },
  teamPlaceholder: {
    id: "jobBuilder.impact.teamPlaceholder",
    defaultMessage: "Try for a casual, frank, friendly tone...",
    description: "",
  },
});

const departmentImpactStatements = defineMessages({
  treasuryBoard: {
    id: "department.impactStatement.treasuryBoard",
    defaultMessage:
      "The Treasury Board of Canada Secretariat provides advice and makes recommendations on how the government spends money, how it regulates and how it is managed ensuring tax dollars are spent wisely and effectively for Canadians.",
    description: "Department Impact Statement of Treasury Board",
  },
  naturalResources: {
    id: "department.impactStatement.naturalResources",
    defaultMessage:
      "Natural Resources Canada seeks to enhance the responsible development and use of Canada’s natural resources and the competitiveness of Canada’s natural resources products.",
    description: "Department Impact Statement of Natural Resources",
  },
  transport: {
    id: "department.impactStatement.transport",
    defaultMessage:
      "Transport Canada works to serve the public interest through the promotion of a safe and secure, efficient and environmentally responsible transportation system in Canada.",
    description: "Department Impact Statement of Transport",
  },
  environmentAndClimateChange: {
    id: "department.impactStatement.environment",
    defaultMessage:
      "ECCC informs Canadians about protecting and conserving our natural heritage, and ensuring a clean, safe and sustainable environment for present and future generations.",
    description:
      "Department Impact Statement of Environment and Climate Change",
  },
  employmentAndSocialDevelopment: {
    id: "department.impactStatement.employment",
    defaultMessage:
      "Employment and Social Development Canada (ESDC) works to improve the standard of living and quality of life for all Canadians. We do this by promoting a labour force that is highly skilled. We also promote an efficient and inclusive labour market.",
    description:
      "Department Impact Statement of Employment and Social Development",
  },
  globalAffairs: {
    id: "department.impactStatement.globalAffairs",
    defaultMessage:
      "Global Affairs Canada manages Canada’s diplomatic relations, provides consular services to Canadians, promotes the country’s international trade, and leads Canada’s international development and humanitarian assistance.",
    description: "Department Impact Statement of Global Affairs",
  },
  boarderServicesAgency: {
    id: "department.impactStatement.boarder",
    defaultMessage:
      "The Canada Border Services Agency (CBSA) facilitates the flow of legitimate travellers and trade. The Agency also enforces more than 90 acts and regulations that keep our country and Canadians safe.",
    description: "Department Impact Statement of Boarder Services Agency",
  },
  innovationScience: {
    id: "department.impactStatement.science",
    defaultMessage:
      "Innovation, Science and Economic Development Canada (ISED) works with Canadians in all areas of the economy and in all parts of the country to improve conditions for investment, enhance Canada's innovation performance, increase Canada's share of global trade and build a fair, efficient and competitive marketplace.",
    description:
      "Department Impact Statement of Innovation, Science and Economic Development",
  },
  publicServiceAndProcurement: {
    id: "department.impactStatement.procurement",
    defaultMessage:
      "Public Services and Procurement Canada serves federal departments and agencies as their central purchasing agent, real property manager, treasurer, accountant, pay and pension administrator, integrity adviser and linguistic authority.",
    description:
      "Department Impact Statement of Public Service and Procurement",
  },
  departmentNationalDefence: {
    id: "department.impactStatement.defence",
    defaultMessage:
      "The Department of National Defence and the Canadian Armed Forces implement government decisions concerning the defence of Canadians’ interests at home and abroad.",
    description: "Department Impact Statement of Department National Defence",
  },
  sharedServicesCanada: {
    id: "department.impactStatement.sharedServices",
    defaultMessage:
      "Shared Services Canada (SSC) delivers digital services to Government of Canada organizations. We provide modern, secure and reliable IT services so federal organizations can deliver digital programs and services that meet Canadians needs.",
    description: "Department Impact Statement of Shared Services Canada",
  },
  healthCanada: {
    id: "department.impactStatement.health",
    defaultMessage:
      "Health Canada is responsible for helping Canadians maintain and improve their health. It ensures that high-quality health services are accessible, and works to reduce health risks.",
    description: "Department Impact Statement of Shared Services Canada",
  },
});

const updateJobWithValues = (
  initialJob: Job,
  locale: "en" | "fr",
  { teamImpact, hireImpact }: JobImpactValues,
): Job => ({
  ...initialJob,
  [locale]: {
    ...initialJob[locale],
    team_impact: teamImpact,
    hire_impact: hireImpact,
  },
});

const JobBuilderImpact: React.FunctionComponent<
  JobBuilderImpactProps & InjectedIntlProps
> = ({
  intl,
  department,
  job,
  modalParent,
  handleSubmit,
  handleModalCancel,
  handleModalConfirm,
}): React.ReactElement => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalParentRef = useRef<HTMLDivElement>(null);
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw Error("Unexpected intl.locale"); // TODO: Deal with this more elegantly.
  }
  const initialValues: JobImpactValues = {
    teamImpact:
      job && job[intl.locale].team_impact ? job[intl.locale].team_impact : "",
    hireImpact:
      job && job[intl.locale].hire_impact ? job[intl.locale].hire_impact : "",
  };
  const validationSchema = Yup.object().shape({
    teamImpact: Yup.string().required(
      intl.formatMessage(validationMessages.required),
    ),
    hireImpact: Yup.string().required(
      intl.formatMessage(validationMessages.required),
    ),
  });
  return (
    <section ref={modalParentRef}>
      <ProgressTracker
        items={items}
        backgroundColor="black"
        fontColor="white"
        classNames="manager-jpb-tracker"
        itemsWrapperClassNames="tracker manager-jpb-tracker-wrapper"
      />
      <div data-c-container="form" data-c-padding="top(triple) bottom(triple)">
        <h3
          data-c-font-size="h3"
          data-c-font-weight="bold"
          data-c-margin="bottom(double)"
        >
          <FormattedMessage
            id="jobBuilder.impact.title"
            defaultMessage="Create an Impact Statement"
            description="Header of Job Poster Builder Impact Step"
          />
        </h3>
        <ul data-c-margin="bottom(double)">
          <li>
            <FormattedMessage
              id="jobBuilder.impact.points.opportunity"
              defaultMessage="Working in the federal government offers an important opportunity to have a broad impact for Canadians."
              description="Bullet Point on Job Poster Builder Impact Step"
            />
          </li>
          <li>
            <FormattedMessage
              id="jobBuilder.impact.points.highlight"
              defaultMessage="This is your chance to highlight what makes your work valuable and interesting."
              description="Bullet Point on Job Poster Builder Impact Step"
            />
          </li>
          <li>
            <FormattedMessage
              id="jobBuilder.impact.points.counts"
              defaultMessage="Your impact statement is the first thing that applicants will see when they click your job poster so make sure it counts!"
              description="Bullet Point on Job Poster Builder Impact Step"
            />
          </li>
        </ul>
        <p data-c-font-weight="bold" data-c-margin="bottom(normal)">
          <FormattedMessage
            id="jobBuilder.impact.header.department"
            defaultMessage="How our department makes an impact:"
            description="Header of Department Impact Section on Job Poster Builder Impact Step"
          />
        </p>
        {/* <!-- The p tag below is where the dynamic department text goes (I used text from an old job poster as placeholder, but the real list of data is in the issue. --> */}
        <p data-c-margin="bottom(double)">
          {department !== undefined &&
            intl.formatMessage(departmentImpactStatements[department])}
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions): void => {
            // The following only triggers after validations pass
            handleSubmit(updateJobWithValues(job || emptyJob(), locale, values))
              .then((isSuccessful: boolean): void => {
                if (isSuccessful) {
                  setIsModalVisible(true);
                }
              })
              .finally(
                (): void => actions.setSubmitting(false), // Required by Formik to finish the submission cycle
              );
          }}
          render={({ isSubmitting }): React.ReactElement => (
            <Form id="form" data-c-grid="gutter">
              <div data-c-grid-item="base(1of1)" data-c-input="textarea">
                <p data-c-font-weight="bold" data-c-margin="bottom(normal)">
                  <FormattedMessage
                    id="jobBuilder.impact.teamHeader"
                    defaultMessage="How our team makes an impact:"
                    description="Header of Job Poster Builder Team Impact Section"
                  />
                </p>
                <p data-c-margin="bottom(normal)">
                  <FormattedMessage
                    id="jobBuilder.impact.teamBody"
                    defaultMessage="Describe the value your team/service/initiative brings to Canadians.
              It doesn’t matter if your work is direct to citizens or back office,
              innovative or maintenance, top priority or ongoing. Describe how it
              contributes to making Canada better the way you would to someone who
              knows nothing about your work."
                    description="Body of Job Poster Builder Team Impact Section"
                  />
                </p>
                <div>
                  <Field
                    name="teamImpact"
                    id="TeamImpact"
                    placeholder={intl.formatMessage(messages.teamPlaceholder)}
                    label={intl.formatMessage(messages.teamLabel)}
                    required
                    component={TextArea}
                  />
                </div>
              </div>
              <div data-c-grid-item="base(1of1)" data-c-input="textarea">
                <p data-c-font-weight="bold" data-c-margin="bottom(normal)">
                  <FormattedMessage
                    id="jobBuilder.impact.hireHeader"
                    defaultMessage="How the new hire makes an impact:"
                    description="Header of Job Poster Builder Hire Impact Section"
                  />
                </p>
                <p data-c-margin="bottom(normal)">
                  <FormattedMessage
                    id="jobBuilder.impact.hireBody"
                    defaultMessage="Describe how the new hire will contribute in this role. Focus on the
              value they’ll bring, not on specific tasks (you’ll provide these
              later on). For example “In this role, you’ll contribute to…” or, “As
              a member of this team, you’ll be responsible for helping us…”"
                    description="Body of Job Poster Builder Hire Impact Section"
                  />
                </p>
                <div>
                  <Field
                    id="HireImpact"
                    name="hireImpact"
                    label={intl.formatMessage(messages.hireLabel)}
                    placeholder={intl.formatMessage(messages.hirePlaceholder)}
                    required
                    component={TextArea}
                  />
                </div>
              </div>
              <div data-c-alignment="centre" data-c-grid-item="base(1of1)">
                {/* <!-- Modal trigger, same as last step. --> */}
                <button
                  data-c-button="solid(c1)"
                  data-c-dialog-action="open"
                  data-c-dialog-id="impact-dialog"
                  data-c-radius="rounded"
                  disabled={isSubmitting}
                  form="form"
                  type="submit"
                >
                  <FormattedMessage
                    id="button.next"
                    defaultMessage="Next"
                    description="Button text Next"
                  />
                </button>
              </div>
            </Form>
          )}
        />
      </div>
      {isModalVisible && (
        <Modal
          id="impact-dialog"
          parentElement={modalParentRef.current}
          visible={isModalVisible}
          onModalConfirm={(): void => {
            handleModalConfirm();
            setIsModalVisible(false);
          }}
          onModalCancel={(): void => {
            handleModalCancel();
            setIsModalVisible(false);
          }}
        >
          <Modal.Header>
            <div
              data-c-background="c1(100)"
              data-c-border="bottom(thin, solid, black)"
              data-c-padding="normal"
            >
              <h5
                data-c-colour="white"
                data-c-font-size="h4"
                id="job-impact-preview-title"
              >
                Awesome work!
              </h5>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div
              data-c-border="bottom(thin, solid, black)"
              data-c-padding="normal"
              id="job-details-preview-description"
            >
              Here&apos;s a preview of the Impact Statement you just entered.
              Feel free to go back and edit things or move to the next step if
              you&apos;re happy with it.
            </div>
            <div
              data-c-background="grey(20)"
              data-c-border="bottom(thin, solid, black)"
              data-c-padding="normal"
            >
              {/* TODO: Pull in the signed-in Manager's department */}
              <JobImpactPreview deptImpact="" teamImpact="" hireImpact="" />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Modal.FooterCancelBtn>Go Back</Modal.FooterCancelBtn>
            <Modal.FooterConfirmBtn>Next Step</Modal.FooterConfirmBtn>
          </Modal.Footer>
        </Modal>
      )}
      <div data-c-dialog-overlay={isModalVisible ? "active" : ""} />
    </section>
  );
};

export default injectIntl(JobBuilderImpact);
