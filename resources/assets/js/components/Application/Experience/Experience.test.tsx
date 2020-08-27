import React from "react";
import { shallow } from "enzyme";
import MyExperience from "./Experience";
import {
  fakeAssetSkills,
  fakeEssentialSkills,
} from "../../../fakeData/fakeSkills";
import {
  educationStatuses,
  educationTypes,
  experienceRequirements,
  recipientTypes,
  recogntitionTypes,
} from "../../../stories/Application/ExperienceModals.stories";
import fakeExperienceSkills from "../../../fakeData/fakeExperienceSkills";
import fakeExperiences from "../../../fakeData/fakeExperience";
import IntlContainer from "../../../IntlContainer";
import ExperienceIntro from "./ExperienceIntro";

describe("Application Timeline - My Experience", (): void => {
  it("should render MyExperience with items", (): void => {
    const wrapper = shallow(
      <IntlContainer locale="en">
        <MyExperience
          assetSkills={fakeAssetSkills()}
          educationStatuses={educationStatuses}
          educationTypes={educationTypes}
          essentialSkills={fakeEssentialSkills()}
          experienceRequirements={experienceRequirements}
          experienceSkills={fakeExperienceSkills()}
          experiences={fakeExperiences()}
          handleContinue={() => {}}
          handleDeleteExperience={async () => {}}
          handleQuit={() => {}}
          handleReturn={() => {}}
          handleSubmitExperience={async () => {}}
          jobId={1}
          recipientTypes={recipientTypes}
          recognitionTypes={recogntitionTypes}
        />
        ,
      </IntlContainer>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should render MyExperience without any experiences", (): void => {
    const wrapper = shallow(
      <IntlContainer locale="en">
        <MyExperience
          assetSkills={fakeAssetSkills()}
          educationStatuses={educationStatuses}
          educationTypes={educationTypes}
          essentialSkills={fakeEssentialSkills()}
          experienceRequirements={experienceRequirements}
          experienceSkills={[]}
          experiences={[]}
          handleContinue={() => {}}
          handleDeleteExperience={async () => {}}
          handleQuit={() => {}}
          handleReturn={() => {}}
          handleSubmitExperience={async () => {}}
          jobId={1}
          recipientTypes={recipientTypes}
          recognitionTypes={recogntitionTypes}
        />
      </IntlContainer>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should render Experience Intro", (): void => {
    const wrapper = shallow(
      <IntlContainer locale="en">
        <ExperienceIntro handleStart={() => {}} />
      </IntlContainer>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
