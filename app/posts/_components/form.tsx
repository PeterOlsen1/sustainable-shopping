"use client";
import { z } from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPost, updatePost } from "../_actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormType, FormSchema } from "../_types";

type Props =
  | { action: "create" }
  | { action: "edit"; item: FormType & { id: string } };

export default function FormComponent(props: Props) {
  const isEdit = props.action === "edit";

  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: isEdit ? props.item.title : "",
      content: isEdit ? props.item.content : "",
    },
  });

  async function onSubmit(values: FormType) {
    if (props.action === "edit") {
      await updatePost(props.item.id, values);
    } else {
      await createPost(values);
    }
  }

  return (
    <>
      <Link href="/posts" className="inline-block mb-4 text-blue-500 underline">
        &larr; Back to list
      </Link>
      <Form {...form}>
        <h2 className="text-2xl text-secondary-foreground mb-2">
          {props.action === "edit" ? "Edit" : "Create"} Post
        </h2>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Type here..."
                    {...field}
                    value={field.value || ""}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type here..."
                    {...field}
                    value={field.value || ""}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting || !form.formState.isDirty}
          >
            {props.action === "edit" ? "Update" : "Create"}
          </Button>
        </form>
      </Form>
    </>
  );
}
