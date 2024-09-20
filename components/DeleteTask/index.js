import Button from "@/Button";
import useStoreTodoList from "@/useStoreTodoList ";
import { Trash } from "lucide-react";

const DeleteTask = ({ collTaskI, collectionIndex }) => {
    const { todoList, removeTask } = useStoreTodoList();

    const deleteHandler = () => {
        const tasksIndex = todoList[collectionIndex].tasks.findIndex(
            (item) => item.id === collTaskI.collectionId
        );
        const itemIndex = todoList[collectionIndex].tasks[tasksIndex].collectionTasks.findIndex(
            (item) => item === collTaskI
        );

        removeTask(collectionIndex, tasksIndex, itemIndex);
    };
    return (
        <Button
            size="tiny"
            className="bg-base-100 w-fit p-0"
            label={<Trash size={16} className="text-base" />}
            tooltip="Delete"
            positionTooltip="top"
            onClick={() => deleteHandler(collTaskI)}
        />
    );
};
export default DeleteTask;
