import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error"
import useVisualMode from "hooks/useVisualMode";

function Appointment (props) {
  // types of mode state 
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRMING = "CONFIRMING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition("SAVING");
    props.bookInterview( props.id, interview)
    .then( () => transition("SHOW"))
    .catch(() => transition("ERROR_SAVE",true));
    
  };

  function edit() { 
   transition("EDIT");
  };

  const confirmation = () =>{
    transition("CONFIRMING");
  }

  const deleteAppoint = () => {
    transition("DELETING", true);
    
    props.cancelInterview(props.id)
    .then( () => transition("EMPTY") )
    .catch(() => transition("ERROR_DELETE", true));

  };

  const close = () => back();
  

  

  return <article className="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={confirmation}
        onEdit={edit}
      />
    )}
    {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={() => back()} /> } 
    {mode === EDIT && <Form interviewers={props.interviewers} student={props.interview.student} interviewer={props.interview.interviewer} onSave={save} onCancel={() => back()} /> } 
    {mode === SAVING && <Status message="Saving" /> } 
    {mode === DELETING && <Status message="Deleting"/> } 
    {mode === CONFIRMING && <Confirm message="Are you sure you would like to delete?" onConfirm={deleteAppoint} onCancel={() => back()}/>} 
    {mode === ERROR_SAVE && <Error message="Could not edit appointment" onClose={close} />}
    {mode === ERROR_DELETE && <Error message="Could not cancel appointment" onClose={close} />}
  </article>
};

export default Appointment;
