import Button from "@/Button";
import DeleteTask from "@/DeleteTask";
import DetailsTask from "@/DetailsTask";
import EditTask from "@/EditTask";
import Modal from "@/Modal";
import useStoreTodoList from "@/useStoreTodoList ";
import { Plus, Tags, Edit, ReceiptText, CircleArrowRight, CircleArrowLeft } from "lucide-react";
import { useState } from "react";

const ShowCollectionItems = ({
    tasksCollection,
    index,
    currentStatusName,
    collectionName,
    collectionId,
}) => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <>
            <div className="flex flex-col p-3 gap-2">
                <div className=" flex flex-col">
                    <Button
                        isIconButton={true}
                        size="tiny"
                        label={<Plus size={16} className={tasksCollection.dotColor} />}
                        className={`${tasksCollection.dotColor} hover:bg-inherit`}
                        tooltip={`Adding a new task to the collection of ${collectionName}`}
                        positionTooltip="top"
                        onClick={() => {
                            setIsOpenModal(true);
                        }}
                    />

                    <span className="border-b-2 border-gray-300"></span>
                </div>

                <ShowTodoList
                    collectionName={collectionName}
                    collectionId={collectionId}
                    currentStatusName={currentStatusName}
                    tasksCollection={tasksCollection}
                    index={index}
                />
            </div>

            <Modal
                currentStatus={currentStatusName}
                collectionStatus={tasksCollection.status}
                mainBgColor={tasksCollection.mainBgColor}
                bgColor={tasksCollection.bgColor}
                setIsOpen={setIsOpenModal}
                tasksCollection={tasksCollection}
                isOpen={isOpenModal}
                collectionName={collectionName}
                collectionId={collectionId}
            />
        </>
    );
};
export default ShowCollectionItems;

//_______________________________________________________

const ShowTodoList = ({
    collectionName,
    collectionId,
    tasksCollection,
    currentStatusName,
    index,
}) => {
    const { todoList, todoStatusChange } = useStoreTodoList();

    const [show, setShow] = useState(false);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [showDetailsComponent, setShowDetailsComponent] = useState(false);
    const [todoId, setTodoId] = useState(0);

    const todoIdHandler = (id) => setTodoId(id);

    const getStatusIndex = (status) => {
        return todoList.findIndex((item) => item.status === status);
    };

    const updateTaskStatus = (collTaskI, direction) => {
        const mainIndex = todoList.findIndex((item) => item === tasksCollection);
        if (mainIndex === -1) return;

        const tasksIndex = todoList[mainIndex].tasks.findIndex((item) => item.id === collectionId);
        if (tasksIndex === -1) return;

        const itemIndex = todoList[mainIndex].tasks[tasksIndex].collectionTasks.findIndex(
            (item) => item.id === collTaskI.id
        );

        const currentIndex = getStatusIndex(collTaskI.currentStatus);

        if (currentIndex === -1) return;

        const newIndex = currentIndex + direction;

        if (newIndex >= 0 && newIndex < todoList.length) {
            const newStatus = todoList[newIndex].status;

            todoStatusChange(mainIndex, tasksIndex, itemIndex, newStatus);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {todoList?.map((item, index) =>
                item.tasks?.map(
                    (tasksItem, idxTasks) =>
                        tasksItem.collectionName === collectionName &&
                        tasksItem.id === collectionId &&
                        tasksItem.collectionTasks?.map(
                            (collTaskI, idxTasks) =>
                                collTaskI.collectionId === collectionId &&
                                collTaskI.currentStatus === currentStatusName && (
                                    <div
                                        onMouseEnter={() => {
                                            setShow(true);
                                            todoIdHandler(collTaskI.id);
                                        }}
                                        onMouseLeave={() => setShow(false)}
                                        key={collTaskI.id}
                                        className={`cursor-pointer p-3 rounded-md  ${
                                            show && collTaskI.id === todoId
                                                ? "bg-gray-300 "
                                                : "bg-base-100"
                                        } flex gap-4 flex-col`}>
                                        <div className="flex items-center justify-between relative">
                                            <span className="text-sm md:text-base font-semibold flex gap-2">
                                                <Tags className="text-base size-5 md:size-6" />
                                                {collTaskI.todoLabel}
                                            </span>

                                            <div
                                                className={`
                                                    flex gap-2 md:gap-1 items-center
                                                    ${
                                                        show && collTaskI.id === todoId
                                                            ? "bg-base-100 px-3 rounded-md absolute z-50 right-0"
                                                            : "hidden"
                                                    }
                                                    `}>
                                                <DeleteTask
                                                    collTaskI={collTaskI}
                                                    collectionIndex={index}
                                                />

                                                <span className="border-r-2"></span>
                                                <Button
                                                    onClick={() => setIsOpenDrawer(true)}
                                                    size="tiny"
                                                    className="bg-base-100"
                                                    startIcon={
                                                        <Edit size={16} className="text-base" />
                                                    }
                                                    tooltip="Edit"
                                                    positionTooltip="top"
                                                />
                                                <span className="border-r-2"></span>

                                                <Button
                                                    onClick={() =>
                                                        setShowDetailsComponent(
                                                            !showDetailsComponent
                                                        )
                                                    }
                                                    size="tiny"
                                                    className="bg-base-100 "
                                                    startIcon={
                                                        <ReceiptText
                                                            size={16}
                                                            className="text-base"
                                                        />
                                                    }
                                                    tooltip="Details"
                                                    positionTooltip="top"
                                                />
                                            </div>
                                        </div>
                                        <div className="text-sm md:text-base flex items-center gap-2 font-semibold">
                                            Priority : <span>{collTaskI.todoPriority}</span>
                                        </div>
                                        <div className="flex gap-2 justify-end items-center ">
                                            <Button
                                                startIcon={<CircleArrowLeft />}
                                                size="tiny"
                                                onClick={() => updateTaskStatus(collTaskI, -1)}
                                                disabled={
                                                    getStatusIndex(collTaskI.currentStatus) === 0
                                                }
                                                className="bg-inherit border-none hover:bg-base-100"
                                            />
                                            <Button
                                                startIcon={<CircleArrowRight />}
                                                size="tiny"
                                                onClick={() => updateTaskStatus(collTaskI, 1)}
                                                disabled={
                                                    getStatusIndex(collTaskI.currentStatus) ===
                                                    todoList.length - 1
                                                }
                                                className="bg-inherit border-none hover:bg-base-100"
                                            />
                                        </div>

                                        {collTaskI.id === todoId && (
                                            <EditTask
                                                itemEdit={collTaskI}
                                                collectionIndex={index}
                                                collectionName={collectionName}
                                                currentStatusName={currentStatusName}
                                                setIsOpenDrawer={setIsOpenDrawer}
                                                isOpenDrawer={isOpenDrawer}
                                            />
                                        )}
                                        {collTaskI.id === todoId && (
                                            <DetailsTask
                                                setShowDetailsComponent={setShowDetailsComponent}
                                                showDetailsComponent={showDetailsComponent}
                                                collTaskI={collTaskI}
                                                todoId={todoId}
                                            />
                                        )}
                                    </div>
                                )
                        )
                )
            )}
        </div>
    );
};
