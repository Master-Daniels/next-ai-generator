"use client";
import { Montserrat } from "next/font/google";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import TypeWriter from "typewriter-effect";
import Link from "next/link";
import { Button } from "../ui/button";

const monteserrat = Montserrat({
    weight: ["600"],
    subsets: ["latin"],
});

const LandingHero = () => {
    const { isSignedIn } = useAuth();

    return (
        <div className={cn("text-white font-bold py-36 text-center space-y-3", monteserrat.className)}>
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xlspace-y-5 font-extrabold">
                <h1>The Best AI tool for</h1>
                <div className="text-transparent uppercase font-bold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    <TypeWriter
                        options={{
                            strings: [
                                "ChatBot.",
                                "Photo Generation.",
                                "Music Generation.",
                                "Code Generation.",
                                "Video Generation.",
                            ],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">
                Create Content using AI <small>(10x faster)</small>.
            </div>
            <div>
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button
                        variant="premium"
                        className="md:text-lg p-4 md:p-6 rounded-full font-semibold hover:scale-110 transition duration-700"
                    >
                        Start Generating for free
                    </Button>
                </Link>
            </div>
            <div className="text-zinc-400 text-sm md:text-sm font-normal">No credit card required.</div>
        </div>
    );
};

export default LandingHero;
