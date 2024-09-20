const PrioritySelector = ({ setTodoPriority, todoPriority }) => {
    const priorities = ["Important", "High", "Medium", "Low", "Lowest"];
    return (
        <>
            <span className="label text-base font-bold md:text-lg">Priority</span>
            <div className="flex flex-col w-full cursor-pointer">
                {priorities.map((priority, index) => (
                    <div key={index} className="flex items-center border-b-2 p-2">
                        <span className="mr-auto font-semibold">{priority}</span>
                        <input
                            type="radio"
                            name="priority"
                            value={priority}
                            className="checkbox checkbox-primary"
                            checked={priority === todoPriority}
                            onChange={() => setTodoPriority(priority)}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};
export default PrioritySelector;
