"use client";

import { Input } from "@base-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  type HTTPRequestFormSchema,
  httpRequestFormSchema,
} from "@/features/executions/schema/execution";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: HTTPRequestFormSchema) => void;
  defaultValues?: Partial<HTTPRequestFormSchema>;
}

export default function HttpRequestDialog({
  open,
  onOpenChange,
  onSubmit,
  defaultValues = {},
}: DialogProps) {
  const form = useForm<HTTPRequestFormSchema>({
    resolver: zodResolver(httpRequestFormSchema),
    defaultValues: {
      endpoint: defaultValues.endpoint || "",
      method: defaultValues.method || "GET",
      body: defaultValues.body || "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        endpoint: defaultValues.endpoint || "",
        method: defaultValues.method || "GET",
        body: defaultValues.body || "",
      });
    }
  }, [
    open,
    defaultValues.body,
    defaultValues.endpoint,
    defaultValues.method,
    form,
  ]);

  const watchmethod = form.watch("method");
  const showBodyField = ["POST", "PUT", "PATCH"].includes(watchmethod);

  function submitForm(data: HTTPRequestFormSchema) {
    onSubmit(data);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>HTTP Request</DialogTitle>
          <DialogDescription>
            Configure settings for the HTTP Request node.
          </DialogDescription>
        </DialogHeader>
        <form
          id="form-rhf-demo"
          onSubmit={form.handleSubmit(submitForm)}
          className="space-y-8 mt-4"
        >
          <FieldGroup>
            <Controller
              name="method"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-method">Method</FieldLabel>
                  <Select
                    id="form-rhf-demo-method"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="PATCH">PATCH</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldDescription>
                    The HTTP method to use for this request
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="endpoint"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-endpoint">
                    Endpoint
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-endpoint"
                    aria-invalid={fieldState.invalid}
                    placeholder="https://api.example.com/users/{{httpResponse.data.id}}"
                    autoComplete="off"
                    className="px-2 py-2.5 text-[13px]"
                  />
                  <FieldDescription>
                    Static URL or use {"{{variables}}"} for simple values or{" "}
                    {"{{json variable}}"} to stringify objects
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {showBodyField && (
              <Controller
                name="body"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-body">
                      Request Body
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id="form-rhf-demo-body"
                      placeholder={`{\n "userId": "{{httpResponse.data.id}}",\n "name": "{{httpResponse.data.name}}"\n "items": "{{httpResponse.data.items}}"\n}`}
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldDescription>
                      JSON with template variable. Use {"{{variables}}"} for
                      simple values or
                      {"{{json variable}}"} to stringify objects
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            )}
          </FieldGroup>
        </form>
        <DialogFooter className="mt-4">
          <Button type="submit" form="form-rhf-demo" className="w-full">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
