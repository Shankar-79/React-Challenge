import { forwardRef, type ChangeEvent } from "react";

interface FormInputProps {
  id?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  type?: string;
  placeholder?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  function FormInput(props, ref) {
    return (
      <div>
        {props.label && <label htmlFor={props.id}>{props.label}</label>}

        <input
          ref={ref}
          id={props.id}
          type={props.type}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
      </div>
    );
  },
);

export default FormInput;
