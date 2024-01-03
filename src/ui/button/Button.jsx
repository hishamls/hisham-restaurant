export default function Button({ children, textOnly, className, ...props }) {
  let buttonStyle = textOnly ? "text-button" : "button";
  buttonStyle += " " + className;
  return (
    <button className={buttonStyle} {...props}>
      {children}
    </button>
  );
}
