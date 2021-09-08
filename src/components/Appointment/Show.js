
import React from "react";
export default function Show(props) {

  // below conditional rendering fixes the prob of when no interviwer is selected, react crushed.
  let interviewerName;
  if (!props.interviewer) {
    interviewerName = <h3 className="text--regular">{""}</h3>
  }
  else { interviewerName = <h3 className="text--regular">{props.interviewer.name}</h3> }

  return (
    <main className="appointment__card appointment__card--show">
      <section className="appointment__card-left">
        <h2 className="text--regular">{props.student}</h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          {interviewerName}
          {/* <h3 className="text--regular">{props.interviewer.name || null}</h3> */}
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <img
            className="appointment__actions-button"
            src="images/edit.png"
            alt="Edit"
            onClick={props.onEdit}
          />
          <img
            className="appointment__actions-button"
            src="images/trash.png"
            alt="Delete"
            onClick={() => props.onDelete(props.id)}
          />
        </section>
      </section>
    </main>
  )
}