import React from "react";
import classNames from "classnames";
import "./DayListItem.scss";
export default function DayListItem(props) {

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full " : props.spots === 0
  });

  const formatSpots = () => {
    let spots = `${props.spots} spots remaining`;
    if (props.spots === 0) spots = 'no spots remaining';
    if (props.spots === 1) spots = '1 spot remaining';
    return spots;
  };

  return (
    <li onClick={() => props.setDay(props.name)} data-testid="day" className={dayClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}