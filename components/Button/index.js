const Button = ({
    startIcon,
    endIcon,
    label,
    size = "medium",
    fullWidth = false,
    isIconButton = false,
    onClick,
    icon,
    tooltip,
    className,
    positionTooltip = "bottom",
    ...props
}) => {
    const sizeClasses = {
        tiny: "btn-xs",
        small: "btn-sm",
        medium: "",
        large: "btn-lg",
    };

    const sizeClass = isIconButton ? "" : sizeClasses[size];
    const fullWidthClass = fullWidth ? "w-full" : "";
    const iconButtonClass = isIconButton
        ? "btn-circle bg-transparent shadow-none border-none hover:bg-opacity-10"
        : "";

    const classes = ["btn", sizeClass, fullWidthClass, iconButtonClass, className || ""]
        .filter(Boolean)
        .join(" ");

    return (
        <div
            className={`tooltip tooltip-info tooltip-${positionTooltip} ${fullWidth && "w-full"}`}
            data-tip={tooltip}>
            <button className={classes} onClick={onClick && onClick} {...props}>
                {startIcon && <span className="mr-1">{startIcon}</span>}
                {icon && icon}
                {label}
                {endIcon && <span className="ml-1">{endIcon}</span>}
            </button>
        </div>
    );
};

export default Button;
