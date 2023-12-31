"use client";

import { useState } from "react";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import Heading from "@/components/general/Heading";
import { VideoIcon } from "lucide-react";
import { FormSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Empty } from "@/components/shared/Empty";
import { Loader } from "@/components/shared/Loader";
import axios from "axios";
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";

const VideoPage = () => {
    const [video, setVideo] = useState<string>();
    const router = useRouter();
    const proModal = useProModal();
    const form = useForm<zod.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            prompt: "",
        },
    });

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: zod.infer<typeof FormSchema>) => {
        try {
            setVideo(undefined);

            const response = await axios.post("/api/video", values);
            console.log(response);

            setVideo(response.data[0]);
            form.reset();
        } catch (error: any) {
            // TODO: open pro model
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
                title="Video Generation"
                desc="Turn your prompts into video"
                icon={VideoIcon}
                iconColor="text-orange-700"
                bgColor="bg-orange-700/10"
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
                                            placeholder="Star fish swimming around a coral leaf"
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
                {!video && !isLoading && <Empty label="No video generated" />}
                <div>
                    {video && (
                        <video controls className="aspect-video mt-8 rounded-lg border bg-black">
                            <source src={video} />
                        </video>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoPage;
