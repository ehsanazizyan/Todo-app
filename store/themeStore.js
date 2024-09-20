import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useThemeStore = create(
    persist(
        (set, get) => ({
            // اکشن برای تغییر تم
            toggleTheme: () =>
                set((state) => {
                    const themes = ["lightTheme", "darkTheme"];
                    const currentIndex = themes.indexOf(state.theme || "lightTheme");
                    const newIndex = (currentIndex + 1) % themes.length;
                    const newTheme = themes[newIndex];
                    document.documentElement.setAttribute("data-theme", newTheme);
                    return { theme: newTheme };
                }),

            // اکشن برای ست کردن تم خاص
            setTheme: (newTheme) =>
                set(() => {
                    document.documentElement.setAttribute("data-theme", newTheme);
                    return { theme: newTheme };
                }),
        }),
        {
            name: "theme", // نام کلید در localStorage
            storage: createJSONStorage(() => localStorage), // تعیین نوع ذخیره‌سازی
            onRehydrateStorage: () => (state) => {
                document.documentElement.setAttribute("data-theme", state.theme || "lightTheme");
            },
        }
    )
);

export default useThemeStore;
