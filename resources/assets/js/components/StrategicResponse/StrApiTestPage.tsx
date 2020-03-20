import React, { useEffect } from "react";
import { RootContainer } from "../RootContainer";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobIndex } from "../../store/Job/jobActions";
import { getAllJobsInDept } from "../../store/Job/jobSelector";
import { RootState } from "../../store/store";
import { localizeField, getLocale } from "../../helpers/localize";
import { Job } from "../../models/types";
import { useIntl } from "react-intl";
import JobIndexHrPage from "../HRPortal/JobIndexHrPage";

const StrJobListing: React.FC<{ jobs: Job[] }> = ({ jobs }) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  return (
    <>
    <h1>{`${jobs.length} jobs loaded.`}</h1>
    <ul>
      {jobs.map(job => (
        <li key={job.id}>
          <p>{localizeField(locale, job, "title")}</p>
        </li>
      ))}
    </ul>
    </>
  );
};

const StrJobFetcher: React.FC<{ strDeptId: number }> = ({ strDeptId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const jobFilter = new Map();
    jobFilter.set("department_id", strDeptId);
    dispatch(fetchJobIndex(jobFilter));
  }, [strDeptId, dispatch]);

  const jobs = useSelector((state: RootState) =>
    getAllJobsInDept(state, { departmentId: strDeptId }),
  );

  return <StrJobListing jobs={jobs} />;
};

const container = document.getElementById("str-api-test");
if (container !== null) {
  if ("strDeptId" in container.dataset) {
    const strDeptId = Number(container.dataset.strDeptId as string);
    ReactDOM.render(
      <RootContainer>
        <StrJobFetcher strDeptId={strDeptId} />
      </RootContainer>,
      container,
    );
  }
}

export default JobIndexHrPage;
