import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"

export default function InterviewerList (props){
const {interviewers, interviewer, setInterviewer}=props;

const parsedInterviewers=interviewers.map(
  interviewerItem=>{
    const {id,name,avatar,selected,setInterviewer}=interviewerItem

    return(
  <InterviewerListItem
      key = {id} 
      name = {name}
      avatar = {avatar}
      selected = {id === interviewer}
      setInterviewer = {()=>setInterviewer(id)}
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