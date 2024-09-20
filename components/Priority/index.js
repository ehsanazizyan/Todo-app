import { useState } from "react";

const Priority = () => {
    const [selectedJobRequirements, setSelectedJobRequirements] = useState([]);

    const jobRequirements = [
        { label: "Under 3 years experience", value: "under-3-years-experience" },
        {
            label: "More than 3 years experience",
            value: "More-than-3-years-experience",
        },
        { label: "No Experience", value: "no-experience" },
        { label: "No Degree", value: "no-degree" },
    ];

    const toggleSelection = (state, setState, value, name) => {
        if (state.includes(value)) {
            const updatedState = state.filter((item) => item !== value);
            setState(updatedState);
            filterContainerHandler(name, updatedState);
        } else {
            const updatedState = [...state, value];
            setState(updatedState);
            filterContainerHandler(name, updatedState);
        }
    };
    return (
        <div className="flex flex-col">
            <span>Job Requirements</span>
            {jobRequirements.map((item, index) => (
                <div key={index} className="flex items-center">
                    <input
                        checked={selectedJobRequirements.includes(item.value)}
                        className="custom-checkbox size-4"
                        id={item.value}
                        name="jobRequirements"
                        type="checkbox"
                        onChange={() =>
                            toggleSelection(
                                selectedJobRequirements,
                                setSelectedJobRequirements,
                                item.value,
                                "jobRequirements"
                            )
                        }
                    />
                    <label
                        className="label cursor-pointer text-sm font-semibold"
                        htmlFor={item.value}>
                        {item.label}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default Priority;
