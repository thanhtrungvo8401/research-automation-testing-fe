import React from "react";

type PropsType = { name?: string };

const Greet: React.FC<PropsType> = (props: PropsType) => {
  return <div>Hello {props.name ? props.name : ""}</div>;
};

export default Greet;
