const InputField = ({
    label,
    multiline,
    onChange,
    onBlur,
    placeholder,
    value,
    className,
    name,
    inputType = multiline ? "textarea-error" : "input-bordered",
    error,
    withError = true,
    ...props
}) => {
    return (
        <label className={`relative flex w-full flex-col ${className ? className : ""}`} {...props}>
            {label && <span className="label text-base font-bold md:text-lg">{label}</span>}

            {multiline ? (
                <textarea
                    className={`textarea textarea-bordered textarea-md w-full ${
                        error && "input-error"
                    }`}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                />
            ) : (
                <input
                    className={`input input-sm input-bordered cursor-text md:input-md
            ${error && "input-error"}
            `}
                    name={name}
                    placeholder={placeholder}
                    type="text"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                />
            )}
            {withError && error && (
                <span className="label-text-alt absolute bottom-[-20px] text-error">
                    {error ? error : ""}
                </span>
            )}
        </label>
    );
};
export default InputField;
