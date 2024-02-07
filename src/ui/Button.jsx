import { Link } from "react-router-dom";

function Button({ children, disabled = false, to, type, onClick }) {
  const base =
    "inline-block bg-yellow-900 text-sm font-semibold uppercase tracking-wide text-stone-800 disabled:cursor-not-allowed";

  const styles = {
    primary: base + " px-4 py-3",
  };

  if (to)
    return (
      <Link className={styles[type]} to={to}>
        children
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className="inline-block bg-yellow-900 text-sm">
      {children}
    </button>
  );
}

export default Button;
