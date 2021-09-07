import React,{useState} from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";



export default function Form(props) {
  const [ name, setName ] = useState(props.name || "");
  const [ interviewer, setInterviewer ] = useState(props.interviewer || null);

  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset(); 
    props.onCancel();
  }

  const save =function() { 
    props.onSave(name, interviewer)
  }


  return (

    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off"onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            // for editing func to keep student's name
            placeholder={props.student? props.student :"Enter Student Name"}
            value={name}
            onChange={e => setName(e.target.value)}
          /*
            This must be a controlled component
          */
          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers} value={interviewer} 
          // here is just passing the func down, when it is called, use call back.
          onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={()=>{cancel()}}>Cancel</Button>
          <Button confirm onClick={save}>Save</Button>
        </section>
      </section>
    </main>

  )
}