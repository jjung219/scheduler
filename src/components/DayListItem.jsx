import React from 'react';
import "components/DayListItem.scss";
import "components/InterviewerListItem.scss";

const classNames = require('classnames');

export default function DayListItem(props) {
  const listClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  })

  const formatSpot = spots => {
    if (spots > 1) {
      return `${spots} spots remaining`;
    }

    if (spots === 1) {
      return `1 spot remaining`;
    }

    if (spots === 0) {
      return "no spots remaining";
    }
  }

  return (
    <li data-testid="day" className={listClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular" >{props.name}</h2> 
      <h3 className="text--light">{formatSpot(props.spots)}</h3>
    </li>
  );
}