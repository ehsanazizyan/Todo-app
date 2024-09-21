import Button from "@/Button";
import { ChevronRight, Mail, Phone } from "lucide-react";

const DetailsTask = ({ setShowDetailsComponent, showDetailsComponent, collTaskI }) => {
    const font = "font-serif font-semibold border-b-2 border-base-content";

    return (
        <div
            className={`fixed inset-0  flex justify-end items-start z-50 transition-transform duration-700 ${
                showDetailsComponent ? "translate-x-0" : "translate-x-full"
            }`}>
            <div className="bg-base-100 w-full md:w-1/2 p-6 space-y-6 overflow-y-scroll h-full">
                <div className="flex gap-4">
                    <Button
                        label={<ChevronRight />}
                        className="btn-primary h-full"
                        size="tiny"
                        onClick={() => setShowDetailsComponent(false)}
                    />

                    <div className="flex flex-col gap-10 w-full">
                        <h3 className={`${font} text-lg flex justify-between items-center`}>
                            Details <span>{collTaskI.todoLabel}</span>
                        </h3>
                        <h3 className={`${font} text-lg flex justify-between items-center`}>
                            Status <span>{collTaskI.currentStatus}</span>
                        </h3>
                        <h3 className={`${font} text-lg flex justify-between items-center`}>
                            Collection <span>{collTaskI.collectionName.toUpperCase()}</span>
                        </h3>

                        <span
                            className={`bg-warning p-3 rounded-md font-semibold text-lg flex justify-between`}>
                            Priority : <span>{collTaskI.todoPriority}</span>
                        </span>

                        <div className="flex flex-col gap-6 font-semibold text-lg">
                            <span className="flex justify-between">
                                Start Date :<span>{collTaskI.startDate}</span>
                            </span>
                            <span className="flex justify-between ">
                                End Date :<span>{collTaskI.endDate}</span>
                            </span>
                            <span className=" border-b-2 border-base-content"></span>
                            <div className="text-gray-400 leading-8">
                                Description :
                                <p className="text-gray-600 ">{collTaskI.todoDescription}</p>
                            </div>
                            <div>
                                {collTaskI.members.length > 0 &&
                                    collTaskI.members.map((member, index) => (
                                        <div
                                            key={index}
                                            className="flex gap-6 rounded-md flex-col shadow-lg p-10 ">
                                            <div className="flex gap-2 items-center justify-between w-full ">
                                                <span className="text-sm font-semibold ">
                                                    {member.name}
                                                </span>

                                                {member.phone && (
                                                    <span className="text-sm font-semibold flex items-center gap-2">
                                                        <Phone size={18} className="text-primary" />
                                                        {member.phone}
                                                    </span>
                                                )}
                                            </div>
                                            {member.email && (
                                                <span className="text-sm font-semibold justify-center flex items-center gap-2">
                                                    <Mail size={18} className="text-primary" />

                                                    {member.email}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DetailsTask;
