import React, { useState } from "react";
import "./convertable_input.scss";

type ConvertableInputProps = {
  value: number;
  altUnit?: {
    suffix: string;
    convert: (input: number) => number;
    invert: (input: number) => number;
  };
  onChange: (value: number) => void;
};

const ConvertableInput = (props: ConvertableInputProps) => {
  const convert = props.altUnit
    ? props.altUnit.convert
    : (input: number) => input;
  const invert = props.altUnit
    ? props.altUnit.invert
    : (input: number) => input;

  // State
  const [altValue, setAltValue] = useState<string>(
    String(convert(props.value))
  );
  const [value, setValue] = useState<string>(String(props.value));

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const altValue = convert(Number(value)).toFixed(0);
    setValue(value);
    setAltValue(altValue);
    props.onChange(Number(value));
  };

  const onAltValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const altValue = event.target.value;
    const value = invert(Number(altValue)).toFixed(0);
    setValue(value);
    setAltValue(altValue);
    props.onChange(Number(value));
  };

  const onFocus = (event: React.FocusEvent<HTMLInputElement>) =>
    event.target.select();

  const altUnitInput = props.altUnit && (
    <>
      <input
        type="number"
        name="altValue"
        onFocus={onFocus}
        style={{ width: 2.5 + "rem" }}
        value={altValue}
        onChange={onAltValueChange}
      />
      <div>{props.altUnit.suffix}</div>
    </>
  );

  return (
    <div className="convertable-input">
      <input
        type="number"
        name="value"
        onFocus={onFocus}
        style={{ width: 2.5 + "rem" }}
        value={value}
        onChange={onValueChange}
      />
      <div>g</div>
      {altUnitInput}
    </div>
  );
};
export default ConvertableInput;
