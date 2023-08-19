import Image from "next/image";
import React from "react";

export const Empty = ({ label }: { label: string }) => {
    return (
        <div className="h-full pt-5 flex flex-col items-center">
            <div className="relative h-72 w-72">
                <Image alt="empty" fill sizes="100vw" src="/empty.png" />
            </div>
            <p className="text-center text-muted-foreground text-sm">{label}</p>
        </div>
    );
};
