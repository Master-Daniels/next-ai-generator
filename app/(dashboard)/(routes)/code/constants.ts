import * as zod from "zod";

export const FormSchema = zod.object({
    prompt: zod.string().nonempty().min(1, { message: "Prompt is required" }),
});
