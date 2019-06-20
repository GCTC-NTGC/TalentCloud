import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import ProgressTracker from "../ProgressTracker/ProgressTracker";
import { items } from "../ProgressTracker/fixtures/progressItems";
import IntroForm from "./IntroForm";

interface JobBuilderIntroProps {
  handleSubmit: (values) => void;
}

const JobBuilderIntro: React.FunctionComponent<
  JobBuilderIntroProps & InjectedIntlProps
> = ({ handleSubmit }): React.ReactElement => {
  return (
    <section>
      <ProgressTracker
        items={items}
        backgroundColor="black"
        fontColor="white"
        classNames="manager-jpb-tracker"
        itemsWrapperClassNames="tracker manager-jpb-tracker-wrapper"
      />

      <IntroForm handleSubmit={handleSubmit} />
    </section>
  );
};

export default injectIntl(JobBuilderIntro);
