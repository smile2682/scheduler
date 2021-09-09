import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;
  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };


  const parsedInterviewers = interviewers.map(
    interviewerItem => {
      const { id, name, avatar } = interviewerItem
      return (
        <InterviewerListItem
          key={id}
          name={name}
          avatar={avatar}
          selected={id === value}
          setInterviewer={(event) => onChange(id)}
        />
      )
    }
  )



  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {parsedInterviewers}
      </ul>
    </section>
  )
}