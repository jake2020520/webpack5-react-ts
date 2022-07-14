import React from "react";
import { FunctionComponent } from "react";

interface TestProps {
  title: string;
  desc: string;
  name: null;
}
const Test: FunctionComponent<TestProps> = (props) => {
  return (
    <>
      <h1>{props.title}</h1>
      <p>{props.desc}</p>
    </>
  );
};
Test({ title: "aa", desc: "desc", name: null });

if (Test.propTypes) {
  Test.propTypes.name = undefined;
}
