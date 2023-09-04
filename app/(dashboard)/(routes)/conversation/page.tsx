"use client";

import { useState } from "react";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import Heading from "@/components/general/Heading";
import { MessageSquare } from "lucide-react";
import { FormSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Empty } from "@/components/shared/Empty";
import { Loader } from "@/components/shared/Loader";
import { cn } from "@/lib/utils";
import { BotAvatar, UserAvatar } from "@/components/shared/Avatars";
import axios from "axios";
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";

const ConversationPage = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const proModal = useProModal();
    const router = useRouter();
    const form = useForm<zod.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            prompt: "",
        },
    });

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: zod.infer<typeof FormSchema>) => {
        try {
            const userMessage = {
                role: "user",
                content: values.prompt,
            };
            const newMessages = [...messages, userMessage];
            const response = await axios.post("/api/conversation", {
                messages: newMessages,
            });
            const resData = await response.data;
            setMessages((current: any) => [...current, userMessage, resData[0].message]);
            form.reset();
        } catch (error: any) {
            if (error?.response?.status === 403) {
                proModal.onOpen();
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            router.refresh();
        }
    };
    return (
        <div>
            <Heading
                title="Conversation"
                desc="Our most advanced conversation model"
                icon={MessageSquare}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
            />
            <div className="px-4 lg:px-8 mt-5 md:mt-10">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="rounded-lg border w-full py-4 px-3 md:px-6 focus-within:shadow-md grid grid-cols-12 gap-2"
                    >
                        <FormField
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input
                                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="How do I calculate the circumference of a circle?"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading}>
                            Generate
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="space-y-4 mt-4 px-4 lg:px-8">
                {isLoading && (
                    <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                        <Loader />
                    </div>
                )}
                {messages.length === 0 && !isLoading && <Empty label="No conversation started" />}
                <div className="flex flex-col gap-y-4">
                    {messages.map((message, i) => {
                        return (
                            <div
                                key={i}
                                className={cn(
                                    "p-8 w-full flex items-start gap-x-8 rounded-lg",
                                    message.role === "user" ? "bg-white bborder border-black/10" : "bg-muted"
                                )}
                            >
                                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                                <p className="text-sm">{message.content}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ConversationPage;
