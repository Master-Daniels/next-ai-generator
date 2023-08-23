"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("9a013ddf-5be2-4765-997e-2a5c59ff634f");
    }, []);
    return null;
};

export default CrispChat;
