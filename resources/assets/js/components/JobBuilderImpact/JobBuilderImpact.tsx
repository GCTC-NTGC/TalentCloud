import * as React from "react";
import {
  injectIntl,
  InjectedIntlProps,
  FormattedMessage,
  defineMessages,
} from "react-intl";
import ProgressTracker from "../ProgressTracker/ProgressTracker";
import { items } from "../ProgressTracker/fixtures/progressItems";
import ImpactForm from "./ImpactForm";

interface JobBuilderImpactProps {
  department?: string;
}

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

const JobBuilderImpact: React.FunctionComponent<
  JobBuilderImpactProps & InjectedIntlProps
> = ({ intl, department }): React.ReactElement => {
  return (
    <section>
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
        <ImpactForm />
      </div>
    </section>
  );
};

export default injectIntl(JobBuilderImpact);
