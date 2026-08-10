interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  id?: string;
  disabled?: boolean;
  variant?: "Primary" | "Secondary" | "danger";
}

export default function Button(props: ButtonProps) {
  return (
    <button
      id={props.id}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      data-variant={props.variant}
    >
      {props.children}
    </button>
  );
}
