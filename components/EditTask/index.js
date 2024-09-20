import Button from "@/Button";
import InputDate from "@/InputDate";
import InputField from "@/InputField";
import PrioritySelector from "@/PrioritySelector";
import TeamMembers from "@/TeamMembers";
import useStoreTodoList from "@/useStoreTodoList ";

import { useState } from "react";

const EditTask = ({
    itemEdit,
    collectionName,
    collectionIndex,
    currentStatusName,
    setIsOpenDrawer,
    isOpenDrawer,
}) => {
    const { todoList, editTask } = useStoreTodoList();

    const [todoLabel, setTodoLabel] = useState(itemEdit.todoLabel);
    const [todoDescription, setTodoDescription] = useState(itemEdit.todoDescription);
    const [todoPriority, setTodoPriority] = useState(itemEdit.todoPriority);
    const [members, setMembers] = useState([...itemEdit.members]);

    const [isStartDateEmpty, setIsStartDateEmpty] = useState(false);
    const [startDate, setStartDate] = useState(itemEdit.startDate);
    const [endDate, setEndDate] = useState(itemEdit.endDate);
    const [errorMsgDate, setErrorMsgDate] = useState("");

    const dateHandler = (setter, relatedDate, comparison) => (date) => {
        const selectedDate = date.target.value;
        if (comparison === "startDate" && endDate && selectedDate >= endDate) {
            setErrorMsgDate("Start Date should be less than End Date");
            setIsStartDateEmpty(true);
            setTimeout(() => setIsStartDateEmpty(false), 3000);

            return;
        }
        if (comparison === "endDate" && relatedDate && selectedDate <= relatedDate) {
            setErrorMsgDate(" End Date should be greater than Start Date");
            setIsStartDateEmpty(true);

            setTimeout(() => setIsStartDateEmpty(false), 3000);

            return;
        }

        if (startDate.length === 0) setIsStartDateEmpty(false);
        setter(selectedDate);
    };
    const getNextDay = (date) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);
        return newDate.toISOString().split("T")[0];
    };

    const editHandler = () => {
        const taskIndex = todoList[collectionIndex].tasks.findIndex(
            (item) => item.id === itemEdit.collectionId
        );
        const itemIndex = todoList[collectionIndex].tasks[taskIndex].collectionTasks.findIndex(
            (item) => item === itemEdit
        );

        const newTask = {
            ...itemEdit,
            todoLabel,
            startDate,
            endDate,
            todoDescription,
            todoPriority,
            members,
        };

        editTask(collectionIndex, taskIndex, itemIndex, newTask);

        setIsOpenDrawer(false);
    };

    return (
        <div
            className={`fixed inset-0  flex justify-end items-start z-50 transition-transform duration-700 ${
                isOpenDrawer ? "translate-x-0" : "translate-x-full"
            }`}>
            <div className="bg-base-100 w-full md:w-1/2 p-6 space-y-6 overflow-y-scroll h-full">
                <div className="mt-4 flex  flex-col gap-2 ">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-lg font-serif">Edit</h3>
                        <h3 className="font-semibold text-lg font-serif">
                            Status : {currentStatusName}
                        </h3>
                    </div>

                    <h3 className="min-w-fit font-semibold font-serif mt-3">
                        Collection Name : {collectionName}
                    </h3>

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
                        disabled={true}
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

                    <PrioritySelector
                        setTodoPriority={setTodoPriority}
                        todoPriority={todoPriority}
                    />
                    <TeamMembers members={members} setMembers={setMembers} />

                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => editHandler()}
                            label="Set"
                            fullWidth={true}
                            className=" btn-primary"
                            tooltip="This name will be chosen as the label of the new set of tasks that you have to do"
                        />
                        <Button
                            onClick={() => setIsOpenDrawer(false)}
                            label="Cancel"
                            className=" btn-primary"
                            fullWidth={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditTask;
