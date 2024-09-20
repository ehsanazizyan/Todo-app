import { Calendar } from "lucide-react";

const InputDate = ({
    label,
    value,
    onChange,
    disabled = false,
    min = null,
    className,
    error = null,
    ...props
}) => {
    return (
        <label className={`relative flex w-full flex-col ${className ? className : ""}`}>
            {label && <span className="label text-base font-bold md:text-lg">{label}</span>}
            <input
                type="date"
                className={`input input-sm input-bordered md:input-md w-full pl-10 ${
                    error && "input-error"
                }`}
                onChange={onChange}
                value={value}
                {...props}
                min={min}
                disabled={disabled}
            />
            <Calendar className="absolute left-2 top-14 sm:hidden transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            {error && (
                <span className="label-text-alt absolute bottom-[-20px] text-error">{error}</span>
            )}
        </label>
    );
};
export default InputDate;
