import prisma from "@/lib/prisma-client";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world", triggers: { event: "hello/world" } },
  async ({ event, step }) => {
    const result = await step.run("handle-hello", async () => {
      return { message: "Hello, World!", id: event.data.id };
    });

    await step.sleep("pause", "1s");

    return { message: `Task ${event.data.id} complete`, result };
  },
);
