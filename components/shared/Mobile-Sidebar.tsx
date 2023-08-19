"use client";

import { useEffect, useState } from "react";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Sidebar from "./Sidebar";

const MobileSidebar = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;
    return (
        <Sheet>
            <SheetTrigger>
                <span className="sr-only max-w ">open</span>
                <span className="md:hidden">
                    <Menu />
                </span>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-fit">
                <Sidebar mobile="!text-base" />
            </SheetContent>
        </Sheet>
    );
};

export default MobileSidebar;
