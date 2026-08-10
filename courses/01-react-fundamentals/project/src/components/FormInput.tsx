interface FormInputProps {
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
}

export default function FormInput(_props: FormInputProps) {
  return (
    <div>
      {_props.label && <label htmlFor={_props.id}>{_props.label}</label>}
      <input
        id={_props.id}
        type={_props.type}
        value={_props.value}
        onChange={_props.onChange}
        placeholder={_props.placeholder}
      />
      {_props.error && <p>{_props.error}</p>}
    </div>
  );
}
