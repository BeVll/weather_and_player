import {createContext, ReactNode, useContext, useState} from "react";
import {Button} from "@nextui-org/react";
import {IoMdClose} from "react-icons/io";

export const SidebarContext = createContext({ isOpen: false, toggleSidebar: () => {} });

export const Sidebar = ({ sidebar, children, isOpen: defaultIsOpen }: { sidebar:ReactNode, children: ReactNode, isOpen?: boolean }) => {
    const [isOpen, setOpen] = useState(defaultIsOpen);

    const toggleSidebar = () => {
        console.log("fasdfa");
        setOpen(!isOpen);
    };

    return (
        <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
            <div className={`fixed bg-content2 w-[400px]  border-l-content3 border-l-1 ${!isOpen ? "right-0" : "right-[-405px]"} top-0 h-screen`}>
                <Button isIconOnly onPress={toggleSidebar} className={"right-3 top-3 absolute"} variant={"light"}>
                    <IoMdClose size={18}/>
                </Button>
                <div className={"p-4"}>
                    {sidebar}
                </div>
            </div>
            {children}
        </SidebarContext.Provider>
    );
};