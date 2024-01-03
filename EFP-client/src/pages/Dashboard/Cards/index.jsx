import React from "react";
import { Card } from "antd";
import CountUp from "react-countup";
import "./Cards.css";

function CardComponent({ title, count, icon, className }) {
  return (
    <Card className={`custom-card ${className}`} title={title}>
      {icon && React.cloneElement(icon, { style: { fontSize: '50px' } })}
      <CountUp end={count} duration={5} />
    </Card>
  );
}

export default CardComponent;
