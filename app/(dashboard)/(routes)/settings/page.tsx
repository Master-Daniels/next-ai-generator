import Heading from "@/components/general/Heading";
import SubscriptionButton from "@/components/shared/SubscriptionButton";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { Settings } from "lucide-react";

export default async function SettingsPage() {
    const isPro = await checkSubscription();
    const apiLimitCount = 10 - (await getApiLimitCount());
    return (
        <div>
            <Heading
                title="Settings"
                desc="Manage Your Account Settings"
                icon={Settings}
                iconColor="text-gray-700"
                bgColor="bg-gray-700/10"
            />
            <div className="px-4 lg:px-8 space-y-4 mt-5">
                <div className="text-muted-foreground text-sm uppercase font-medium text-black">
                    {isPro
                        ? "You are currently on pro plan"
                        : `You are currently on the free plan, with ${apiLimitCount} uses left.`}
                </div>
                <SubscriptionButton isPro={isPro} />
            </div>
        </div>
    );
}
