import Button from "@/Button";
import useThemeStore from "@/themeStore";

import { SunMoon, Sun } from "lucide-react";

const TopBar = () => {
    const { toggleTheme, theme } = useThemeStore();

    return (
        <div className="navbar bg-base-100 space-x-2">
            <div className="flex-1 text-base md:text-xl font-bold text-primary min-w-fit">
                Todo app
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input
                        type="text"
                        placeholder="Search"
                        className="input input-bordered w-full md:w-auto"
                    />
                </div>

                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <Button
                        onClick={toggleTheme}
                        icon={theme && theme === "darkTheme" ? <Sun /> : <SunMoon />}
                        isIconButton
                    />
                </div>
            </div>
        </div>
    );
};
export default TopBar;
