import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";
import PropTypes from 'prop-types';

function InterviewerList ({value, onChange, interviewers}) {
  
 const interviwerArray = interviewers.map( interviewer => {
    
  return  (<InterviewerListItem 
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === value}
      setInterviewer={() => onChange(interviewer.id)}    
      // onChange={() => setInterviewer(interviewer.id)}

    /> );
  
  });

  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
      {interviwerArray}
    </ul>
  </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};


export default InterviewerList;