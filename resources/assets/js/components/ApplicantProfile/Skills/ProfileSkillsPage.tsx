import React from "react";
import ReactDOM from "react-dom";
import {
  useApplicantSkillIds,
  useSkills,
} from "../../../hooks/apiResourceHooks";
import RootContainer from "../../RootContainer";

export const ProfileExperiencePage: React.FC<{ applicantId: number }> = ({
  applicantId,
}) => {
  const skillsResource = useSkills();
  const applicantSkillsResource = useApplicantSkillIds(applicantId);

  return <p>Hello welcome to the skills page!</p>;
};

if (document.getElementById("profile-skills")) {
  const root = document.getElementById("profile-skills");
  if (root && "applicantId" in root.dataset) {
    const applicantId = Number(root.dataset.applicantId as string);
    ReactDOM.render(
      <RootContainer>
        <ProfileExperiencePage applicantId={applicantId} />
      </RootContainer>,
      root,
    );
  }
}

export default ProfileExperiencePage;
