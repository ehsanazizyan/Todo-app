import Button from "@/Button";
import InputField from "@/InputField";
import { Mail, PencilLine, Phone, X } from "lucide-react";
import { useState } from "react";

const TeamMembers = ({ members, setMembers }) => {
    const [memberInfo, setMemberInfo] = useState({
        name: "",
        phone: "",
        email: "",
    });

    const [isOpenDropdown, setIsOpenDropdown] = useState(false);

    const infoHandler = (e) => {
        const { name, value } = e.target;
        setMemberInfo({ ...memberInfo, [name]: value });
    };

    const addMembersHandler = () => {
        if (
            memberInfo.name.trim().length === 0 &&
            memberInfo.phone.trim().length === 0 &&
            memberInfo.email.trim().length === 0
        )
            return;
        setMembers([...members, memberInfo]);
        setMemberInfo({
            name: "",
            phone: "",
            email: "",
        });
    };

    const removeMember = (index) => {
        setMembers([...members.filter((item, i) => i !== index)]);
    };

    return (
        <>
            <details className="dropdown w-full">
                <summary
                    onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                    className="btn m-1 w-full">
                    {isOpenDropdown ? (
                        <span>Close</span>
                    ) : (
                        <span>Add&nbsp;Other&nbsp;Colleagues</span>
                    )}
                </summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-full shadow space-y-2">
                    <li>
                        <label className="input input-bordered flex items-center ">
                            <PencilLine />
                            <input
                                type="text"
                                placeholder="Name"
                                onChange={infoHandler}
                                name="name"
                                value={memberInfo.name}
                            />
                        </label>
                    </li>
                    <li>
                        <label className="input input-bordered flex items-center gap-2">
                            <Phone />
                            <input
                                type="text"
                                placeholder="Phone Number"
                                onChange={infoHandler}
                                name="phone"
                                value={memberInfo.phone}
                            />
                        </label>
                    </li>
                    <li>
                        <label className="input input-bordered flex items-center gap-2">
                            <Mail />
                            <input
                                type="text"
                                placeholder="Email Address"
                                onChange={infoHandler}
                                name="email"
                                value={memberInfo.email}
                            />
                        </label>
                    </li>
                    <li>
                        <Button
                            className="btn-primary btn-sm md:btn md:text-white w-full"
                            label="Add"
                            onClick={addMembersHandler}
                        />
                    </li>
                </ul>
            </details>
            <div className="flex items-end gap-1">
                {members.length > 0 && (
                    <div className="flex flex-col w-full gap-x-2 gap-y-4">
                        {members.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-wrap justify-between p-1 items-center gap-3 shadow-sm bg-base-100 px-3 rounded-sm">
                                <div className="inline-flex justify-between w-full text-sm font-semibold md:text-xs">
                                    <span>{item.name}</span>
                                    <span>{item.phone}</span>
                                </div>

                                <div className="inline-flex text-sm font-semibold md:text-xs justify-between w-full">
                                    <span>{item.email}</span>
                                    <Button
                                        className="bg-base-100 border-none"
                                        label={<X size={16} />}
                                        size="tiny"
                                        onClick={() => removeMember(index)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};
export default TeamMembers;
