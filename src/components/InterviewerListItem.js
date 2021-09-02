import React from "react";
import "components/InterviewerListItem.scss"
const classNames = require('classnames');
export default function InterviewerListItem(props){
  const {id,name,avatar,selected,setInterviewer}=props

  const interviewersItemClass = classNames(
    "interviewers__item",{"interviewers__item--selected":selected}
  );


return(
<li className={interviewersItemClass} onClick={setInterviewer}>
  <img
    className="interviewers__item-image"
    src={avatar}
    alt={name}
  />
  {/* the if statement in JSX */}
  {selected && name}
</li>
);
}

