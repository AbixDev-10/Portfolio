function FormField({
  id,
  label,
  type = "text",
  placeholder,
  rows,
  as = "input",
  name,
  value,
  onChange,
  required = false,
  disabled = false
}) {
  const sharedClassName =
    "w-full rounded-[1.15rem] border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-rose-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white";

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={name || id}
          rows={rows}
          placeholder={placeholder}
          className={sharedClassName}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
        />
      ) : (
        <input
          id={id}
          name={name || id}
          type={type}
          placeholder={placeholder}
          className={sharedClassName}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
        />
      )}
    </div>
  );
}

export default FormField;
