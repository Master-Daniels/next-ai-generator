import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const UserAvatar = () => {
    const { user } = useUser();
    return (
        <Avatar className="h-8 w-8">
            <AvatarImage src={user?.imageUrl} sizes="100vw" />
            <AvatarFallback>
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
            </AvatarFallback>
        </Avatar>
    );
};

export const BotAvatar = () => {
    return (
        <Avatar className="h-8 w-8">
            <AvatarImage src="/logo.png" alt="logo" sizes="100vw" />
            <AvatarFallback>Logo </AvatarFallback>
        </Avatar>
    );
};
