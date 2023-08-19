import * as zod from "zod";

export const FormSchema = zod.object({
    prompt: zod.string().nonempty().min(1, { message: "Image prompt is required" }),
    amount: zod.string().min(1),
    resolution: zod.string().min(1),
});

export const amountOptions = [1, 2, 3, 4, 5].map((num) => ({
    value: `${num}`,
    label: `${num} Photo${num > 1 ? "s" : ""}`,
}));

export const resolutionOptions = ["256x256", "512x512", "1024x1024"].map((num) => ({
    value: num,
    label: num,
}));
