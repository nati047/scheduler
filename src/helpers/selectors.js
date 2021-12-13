 export function getAppointmentsForDay(state, day) {
  let appointmentArray = [];
  if (state.days.length === 0) {
    return appointmentArray;
  }
  const selectedDayArr = state.days.filter( days => days.name === day);
  
  if(selectedDayArr.length === 0) {
    return appointmentArray;
  };
  
  selectedDayArr[0].appointments.map( id => {
    for( let keys in state.appointments){
      if(Number(keys) === id) {
        appointmentArray.push(state.appointments[keys]);
      }
    } 
  })
  return appointmentArray;
};




export function getInterviewersForDay(state, day) {
  let interviewersArray = [];
  if (state.days.length === 0) {
    return interviewersArray;
  }
  const selectedDayArr = state.days.filter( days => days.name === day);
  
  if(selectedDayArr.length === 0) {
    return interviewersArray;
  };
  
  selectedDayArr[0].interviewers.map( id => {
    for( let keys in state.interviewers){
      if(Number(keys) === id) {
        interviewersArray.push(state.interviewers[keys]);
      }
    } 
  });

  return interviewersArray;
};

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewObj = {
    "student": interview.student,
    "interviewer": state.interviewers[interview.interviewer]
  };
  return interviewObj;
};


