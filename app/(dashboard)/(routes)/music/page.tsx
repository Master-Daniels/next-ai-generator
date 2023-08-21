"use client";

import { useState } from "react";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import Heading from "@/components/general/Heading";
import { Music } from "lucide-react";
import { FormSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Empty } from "@/components/shared/Empty";
import { Loader } from "@/components/shared/Loader";
import { cn } from "@/lib/utils";
import axios from "axios";

const MusicPage = () => {
    const [music, setMusic] = useState<{ audio: string; spectrogram: string }>({ audio: "", spectrogram: "" });
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
            setMusic({ audio: "", spectrogram: "" });

            const response = await axios.post("/api/music", values);
            console.log(response.data);

            setMusic(response.data);
            form.reset();
        } catch (error: any) {
            // TODO: open pro model
            console.log(error);
        } finally {
            router.refresh();
        }
    };
    return (
        <div>
            <Heading
                title="Music Generation"
                desc="Turn your prompts into music"
                icon={Music}
                iconColor="text-emerald-500"
                bgColor="bg-emerald-500/10"
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
                                            placeholder="Hans Zimmer Song"
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
                {music.audio.length === 0 && !isLoading && <Empty label="No music generated" />}
                <div>
                    {music && (
                        <audio controls className="w-full mt-8">
                            <source src={music.audio} />
                        </audio>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MusicPage;
