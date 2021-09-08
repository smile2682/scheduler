import React from "react";
import './styles.scss';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from './Form';
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error"


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const DELETE = "DELETE"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  // why put save and deleteAppo func here, not in the helper func?
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true))

  }

  function deleteAppo() {
    transition(DELETE,true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true))

  }


 console.log("props=",props.interview)
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
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
      />
    )}

    {mode === CREATE && (
      <Form
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
      />

    )}

    {mode === SAVING && <Status message="Saving" />}
    {mode === DELETE && <Status message="Deleting" />}

    {mode === CONFIRM &&
      <Confirm
        message="Are you sure you would like to delete?" onConfirm={deleteAppo}
        onCancel={back}
      //  why props.id is not passed down from here but still available in the confirm.js button?we dont need the props.id at confirm.js since deleteAppo takes no parameters.
      />}

    {mode === EDIT &&
      <Form
        name={props.interview.student}
        // if time, review interview logic:why??
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        // Best practice to use below or callback?
        onCancel={back}
        onSave={save}

      />
    }

    {mode === ERROR_SAVE &&
      <Error message="could not save appointment" onClose={back}
      />}

    {mode === ERROR_DELETE &&
      <Error message="could not cancel appointment" onClose={back}
      />}


    {/* {props.interview ?
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      /> : <Empty />} */}



  </article>
}