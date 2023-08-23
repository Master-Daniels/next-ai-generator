import { testimonials } from "@/constants";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const LandingContent = () => {
    return (
        <div className="px-10 pb-20">
            <h1 className="text-center text-4xl text-white font-extrabold mb-10">Testimonials</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {testimonials.map(({ description, name, avatar, title }) => (
                    <Card key={description} className="bg-[#192339] border-none text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div>
                                    <p className="text-lg">{name}</p>
                                    <p className="text-zinc-400 text-sm">{title}</p>
                                </div>
                            </CardTitle>
                            <CardContent className="pt-4 px-0 text-sm">{description}</CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default LandingContent;
