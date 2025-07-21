import { z } from "zod";

  export const FormSchema = z.object({
    title: z.string(),
content: z.string(),
  });

  export type FormType = z.infer<typeof FormSchema>;
 