import Button from "@/Button";
import InputField from "@/InputField";
import useStoreTodoList from "@/useStoreTodoList ";
import { Dot, Plus } from "lucide-react";
import { useState } from "react";

const TaskStatus = ({ title, bgColor, dotColor, mainBgColor, status, index }) => {
    const { todoList, addCollection } = useStoreTodoList();

    const [show, setShow] = useState(false);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);

    const [collectionNameInput, setCollectionNameInput] = useState("");

    const generateId = (previousIds) => {
        return previousIds.length === 0 ? 1 : +previousIds[previousIds.length - 1].id + 1;
    };

    // const addCollection = () => {
    //     if (!collectionNameInput.trim()) return;

    //     setTodoList((prevTodoList) =>
    //         prevTodoList.map((todoItem, idx) =>
    //             idx === index
    //                 ? {
    //                       ...todoItem,
    //                       tasks: [
    //                           ...todoItem.tasks,
    //                           {
    //                               id: generateId(todoItem.tasks),
    //                               collectionName: collectionNameInput,
    //                               status,
    //                               collectionTasks: [],
    //                           },
    //                       ],
    //                   }
    //                 : todoItem
    //         )
    //     );

    //     setCollectionNameInput("");
    //     setIsOpenDrawer(false);
    // };

    const handleAddCollection = () => {
        addCollection(index, {
            id: generateId(todoList[index].tasks),
            collectionName: collectionNameInput,
            status,
            collectionTasks: [],
        });
        setCollectionNameInput("");
        setIsOpenDrawer(false);
    };

    const taskCounts = todoList.map((todoItem) => ({
        collectionName: todoItem.title,
        taskCount: todoItem.tasks.length,
    }));

    return (
        <div
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            className={`${mainBgColor} p-2 w-full min-w-[70%] md:min-w-fit rounded-sm flex items-center gap-2 relative`}>
            <div className={`${bgColor} flex items-center w-fit rounded-full pr-3`}>
                <Dot className={`${dotColor}`} />
                <span className="md:text-base font-semibold text-black text-sm min-w-fit">
                    {title}
                </span>
            </div>

            <span className={dotColor}> {taskCounts[index].taskCount} </span>

            {show && (
                <div className="flex items-center gap-2 ml-auto">
                    <Plus
                        size={16}
                        className={`${dotColor} cursor-pointer`}
                        onClick={() => setIsOpenDrawer(true)}
                    />
                </div>
            )}

            <div
                className={`fixed inset-0  flex justify-end items-start z-50 transition-transform duration-700 ${
                    isOpenDrawer ? "translate-x-0" : "translate-x-full"
                }`}>
                <div className="bg-base-100 w-full md:w-1/3 h-full p-6 space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-lg">Status</h3>
                        <span className={`font-semibold text-lg ${dotColor}`}>{title}</span>
                    </div>
                    <p className="mt-4 font-semibold text-base">
                        Write a name for your new Collection
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                        <h3 className="min-w-fit font-semibold">Collection Name :</h3>
                        <InputField
                            className="input-sm w-full "
                            placeholder="Name is ..."
                            type="text"
                            value={collectionNameInput}
                            onChange={(e) => setCollectionNameInput(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => handleAddCollection()}
                            label="Add"
                            fullWidth={true}
                            className="bg-success  btn-primary"
                            tooltip="This name will be chosen as the label of the new set of tasks that you have to do"
                        />
                        <Button
                            onClick={() => setIsOpenDrawer(false)}
                            label="Close"
                            className="bg-error btn-primary"
                            fullWidth={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskStatus;
