import React from "react";
import './styles.scss';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from './Form';
import Status from "./Status";
import Confirm from "./Confirm";

// import { getInterviewersForDay } from "helpers/selectors";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const DELETE = "DELETE"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  // why put save func here, not in the helper func?
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))

  }

  function deleteAppo (){
    transition(DELETE);
    props.cancelInterview(props.id)
    .then(()=>transition(EMPTY))

  }

  // function onDelete(){
  //   transition(CONFIRM)
  // }

  return <article className="appointment">
    <Header time={props.time} />
    {mode === EMPTY &&
      <Empty
        onAdd={() => transition(CREATE)}
      />
    }


    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={()=>transition(CONFIRM)}
        onEdit={()=>transition(EDIT)}
      />
    )}

    {mode === CREATE && (
      <Form
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save} 
        student={props.interview.student}
        interviewer={props.interview}
        />
        
    )}

    {mode === SAVING && <Status message= "Saving" />}
    {mode === DELETE && <Status message= "Deleting" />}
    {mode === CONFIRM &&
     <Confirm 
     message = "Are you sure you would like to delete?" onConfirm = {deleteAppo}  
     onCancel={back}
    //  why props.id is not passed down from here but still available in the confirm.js button?
     />}

    {mode === EDIT && 
    <Form
    student={props.interview.student}
    // if time, review interviewer logic
    interviewer={props.interview.interviewer.id}
    interviewers={props.interviewers}
    onCancel={back}
    onSave={save}

    />
  }

    {/* {props.interview ?
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      /> : <Empty />} */}



  </article>
}