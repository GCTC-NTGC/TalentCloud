import React from "react";
import { connect } from "react-redux";

import * as SampleActions from '../actions/sample';
import * as samples from '../selectors/sample';
import { RootState } from "../reducers";
import { Dispatch, bindActionCreators } from "redux";
import { Sample } from "../model/model";

interface IReduxHomeProps {
  samples: Sample[];
  handleAddSample: (id: number) => any;
}

const ReduxHome = (props: IReduxHomeProps) => (
  <div>
    <ul>
      Samples: {props.samples.map((s: Sample) => <li key={s.id}>{s.name}</li>)}
    </ul>
    <a onClick={() => props.handleAddSample(props.samples.length + 1)}>Add a sample</a>
  </div>);


const mapStateToProps = (state: RootState) => ({ samples: samples.getSamples(state) })
const mapDispatchToProps = (dispatch: Dispatch<any>) => bindActionCreators({
  handleAddSample: SampleActions.addSample,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ReduxHome);
