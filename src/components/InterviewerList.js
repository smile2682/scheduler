import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"
import PropTypes from 'prop-types';

export default function InterviewerList (props){
const {interviewers, value, onChange}=props;
// this one is not shown, but the map on line 13 for error.
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};


const parsedInterviewers=interviewers.map(
  interviewerItem=>{
    const {id,name,avatar}=interviewerItem
// console.log("interItem",interviewerItem)
// console.log("props",props);
    return(
  <InterviewerListItem
      key = {id} 
      name = {name}
      avatar = {avatar}
      selected = {id === value}
      setInterviewer = {(event)=>onChange(id)}
      />
    )
}
)



return(
<section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">
    {parsedInterviewers}
  </ul>
</section>
)
}