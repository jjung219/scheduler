import React from 'react';

const classnames = require('classnames');

function InterviewerListItem (props) {
  
  const listClass = classnames("interviewers__item",{ 
    "interviewers__item--selected": props.selected
  });
  const imgClass = classnames("interviewers__item-image", {
    "interviewers__item--selected-image": props.selected
  });

  return (
    <li className={listClass} onClick={props.setInterviewer}>
      <img
        className={imgClass}
        src={props.avatar}
        alt={props.name}
        selected={props.selected}
      />
      {props.selected && props.name}
    </li>
  );
};

export default InterviewerListItem;