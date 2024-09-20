import Button from "@/Button";
import InputDate from "@/InputDate";
import { ChevronLeft, Plus, X } from "lucide-react";
import InputField from "@/InputField";
import { useState } from "react";
import PrioritySelector from "@/PrioritySelector";
import TeamMembers from "@/TeamMembers";
import useStoreTodoList from "@/useStoreTodoList ";

const Modal = ({
    setIsOpen,
    currentStatus,
    collectionStatus,
    bgColor,
    mainBgColor,
    isOpen,
    collectionName,
    collectionId,
    tasksCollection,
}) => {
    const { todoList, addTask } = useStoreTodoList();

    const [todoLabel, setTodoLabel] = useState("");
    const [todoDescription, setTodoDescription] = useState("");
    const [todoPriority, setTodoPriority] = useState("");
    const [members, setMembers] = useState([]);

    const [isStartDateEmpty, setIsStartDateEmpty] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [errorMsgDate, setErrorMsgDate] = useState("");

    const dateHandler = (setter, relatedDate, comparison) => (date) => {
        const selectedDate = date.target.value;
        if (comparison === "startDate" && endDate && selectedDate >= endDate) {
            setErrorMsgDate("Start Date should be less than End Date");
            return setIsStartDateEmpty(true);
        }
        if (comparison === "endDate" && relatedDate && selectedDate <= relatedDate) {
            setErrorMsgDate(" End Date should be greater than Start Date");
            return setIsStartDateEmpty(true);
        }

        if (startDate.length === 0) setIsStartDateEmpty(false);
        setter(selectedDate);
    };
    const getNextDay = (date) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);
        return newDate.toISOString().split("T")[0];
    };

    const generateId = (previousIds) => {
        return previousIds.length === 0 ? 1 : +previousIds[previousIds.length - 1].id + 1;
    };

    const saveHandler = () => {
        const mainIndex = todoList.findIndex((item) => item === tasksCollection);
        const tasksIndex = todoList[mainIndex].tasks.findIndex((item) => item.id === collectionId);
        const newTask = {
            todoLabel: todoLabel,
            id: generateId(todoList[mainIndex].tasks[tasksIndex].collectionTasks),
            collectionId: collectionId,
            collectionStatus,
            currentStatus,
            collectionName,
            todoDescription: todoDescription,
            todoPriority: todoPriority,
            members: members,
            startDate: startDate,
            endDate: endDate,
        };

        addTask(mainIndex, tasksIndex, newTask);

        setIsOpen(false);
        setTodoLabel("");
        setTodoDescription("");
        setTodoPriority("");
        setMembers([]);
        setStartDate("");
        setEndDate("");
    };

    return (
        <div
            className={`fixed  top-0 left-0 w-full h-full bg-opacity-50 flex justify-center items-center z-20 transition-transform duration-700 ease-in-out ${
                isOpen ? "translate-x-0 opacity-100 " : "-translate-x-full opacity-0"
            }`}
            style={{ willChange: "transform, opacity" }}>
            <div
                className={`overflow-y-auto h-full flex gap-3 flex-col w-full md:w-1/2 p-5 rounded-lg shadow-lg ${mainBgColor}`}>
                <div className={`flex justify-between items-center rounded-md p-2  ${bgColor}`}>
                    <span className="font-serif">Collection: {collectionName}</span>
                    <Button
                        label={<ChevronLeft size={16} />}
                        size="tiny"
                        onClick={() => setIsOpen(false)}
                    />
                </div>

                <InputField
                    onChange={(e) => setTodoLabel(e.target.value)}
                    label="Todo Label"
                    placeholder="Todo Label"
                    value={todoLabel}
                />
                <InputDate
                    label="Start Date"
                    value={startDate}
                    onChange={dateHandler(setStartDate, endDate, "startDate")}
                    onClick={() => startDate.length === 0 && setIsStartDateEmpty(true)}
                />
                <InputDate
                    label="End Date"
                    value={endDate}
                    onChange={dateHandler(setEndDate, startDate, "endDate")}
                    min={startDate ? getNextDay(startDate) : ""}
                    disabled={isStartDateEmpty}
                    error={isStartDateEmpty && errorMsgDate}
                />

                <InputField
                    onChange={(e) => setTodoDescription(e.target.value)}
                    label="Description"
                    placeholder="Todo Description"
                    multiline={true}
                    value={todoDescription}
                />

                <PrioritySelector setTodoPriority={setTodoPriority} todoPriority={todoPriority} />
                <TeamMembers members={members} setMembers={setMembers} />
                <Button
                    label="Save"
                    fullWidth={true}
                    className="btn-primary"
                    onClick={saveHandler}
                />
            </div>
        </div>
    );
};
export default Modal;

//__________________________________

// const Modal = ({ setIsOpen, statusName, bgColor, mainBgColor, isOpen }) => {
//     const [todoLabel, setTodoLabel] = useState("");
//     const [todoDescription, setTodoDescription] = useState("");
//     const [todoPriority, setTodoPriority] = useState("");
//     const [members, setMembers] = useState([]);

//     const [isStartDateEmpty, setIsStartDateEmpty] = useState(false);
//     const [startDate, setStartDate] = useState("");
//     const [endDate, setEndDate] = useState("");
//     const [errorMsgDate, setErrorMsgDate] = useState("");

//     const dateHandler = (setter, relatedDate, comparison) => (date) => {
//         const selectedDate = date.target.value;
//         if (comparison === "startDate" && endDate && selectedDate >= endDate) {
//             setErrorMsgDate("Start Date should be less than End Date");
//             return setIsStartDateEmpty(true);
//         }
//         if (comparison === "endDate" && relatedDate && selectedDate <= relatedDate) {
//             setErrorMsgDate(" End Date should be greater than Start Date");
//             return setIsStartDateEmpty(true);
//         }

//         if (startDate.length === 0) setIsStartDateEmpty(false);
//         setter(selectedDate);
//     };
//     const getNextDay = (date) => {
//         const newDate = new Date(date);
//         newDate.setDate(newDate.getDate() + 1);
//         return newDate.toISOString().split("T")[0];
//     };
//     //   className={`absolute top-0 left-0 w-full md:w-1/3 pt-10 px-2 ${mainBgColor} overflow-y-scroll`}

//     return (
//         <div
//             className={`absolute top-0 left-0 w-full md:w-1/3 pt-10 px-2 ${mainBgColor} overflow-y-scroll`}>
//             <div
//                 className={`${bgColor} flex fixed z-20 top-0 left-0 w-full md:w-1/3 items-center justify-between rounded-md px-3 font-serif py-1`}>
//                 Status <span>{statusName}</span>
//                 <Button
//                     label={<ChevronLeft size={16} />}
//                     size="tiny"
//                     onClick={() => setIsOpen(false)}
//                 />
//             </div>
//             <div className="flex flex-col w-full gap-3">
//                 <InputField
//                     onChange={(e) => setTodoLabel(e.target.value)}
//                     label="Todo Label"
//                     placeholder="Todo Label"
//                 />
//                 <InputDate
//                     label="Start Date"
//                     value={startDate}
//                     onChange={dateHandler(setStartDate, endDate, "startDate")}
//                     onClick={() => startDate.length === 0 && setIsStartDateEmpty(true)}
//                 />
//                 <InputDate
//                     label="End Date"
//                     value={endDate}
//                     onChange={dateHandler(setEndDate, startDate, "endDate")}
//                     min={startDate ? getNextDay(startDate) : ""}
//                     disabled={isStartDateEmpty}
//                     error={isStartDateEmpty && errorMsgDate}
//                 />

//                 <InputField
//                     onChange={(e) => setTodoDescription(e.target.value)}
//                     label="Description"
//                     placeholder="Todo Description"
//                     multiline={true}
//                 />
//                 <PrioritySelector setTodoPriority={setTodoPriority} todoPriority={todoPriority} />

//                 <TeamMembers members={members} setMembers={setMembers} />
//             </div>
//         </div>
//     );
// };
// export default Modal;

//__________________________________
