"use client";

import { useState } from "react";
import { Loader } from "./Loader";
import { Zap } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "react-hot-toast";

interface SubscriptionButtonProps {
    isPro: boolean;
}
const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
    const [loading, setLoading] = useState(false);
    const handleClick = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe");

            window.location.href = response.data.url;
        } catch (error: any) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (loading)
        return (
            <div className="grid place-content-center">
                <Loader text="AI Generator is connecting to stripe..." />
            </div>
        );

    return (
        <Button variant={isPro ? "default" : "premium"} onClick={handleClick} disabled={loading}>
            {isPro ? "Manage Subscription" : "Upgrade"}
            {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
        </Button>
    );
};

export default SubscriptionButton;
