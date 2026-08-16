"use client";
import { SaveIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { toast } from "@/components/ui/toast";
import {
  useSuspenseWorkflow,
  useUpdateWorkflowName,
} from "@/features/workflows/hooks/use-workflows";

export default function EditorHeader({ workflowId }: { workflowId: string }) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 bg-background">
      <SidebarTrigger />
      <div className="flex flex-row items-center justify-between gap-x-4 w-full">
        <EditorBradCrumps workflowId={workflowId} />
        <EditorSaveButton workflowId={workflowId} />
      </div>
    </header>
  );
}

export function EditorSaveButton({ workflowId }: { workflowId: string }) {
  return (
    <div className="ml-auto">
      <Button size="sm" onClick={() => {}} disabled={false}>
        <SaveIcon className="size-4" />
        Save
      </Button>
    </div>
  );
}

export function EditorBradCrumps({ workflowId }: { workflowId: string }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            render={
              <Link href="/workflows" prefetch>
                Workflows
              </Link>
            }
          />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <EditorInput workflowId={workflowId} />
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function EditorInput({ workflowId }: { workflowId: string }) {
  const { data: workflow } = useSuspenseWorkflow(workflowId);
  const updateWorkflow = useUpdateWorkflowName();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(workflow.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (workflow.name) {
      setName(workflow.name);
    }
  }, [workflow.name]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  async function handleSave() {
    if (name === workflow.name) {
      setIsEditing(false);
      return;
    }

    try {
      await updateWorkflow.mutateAsync({ id: workflowId, name });
      setIsEditing(false);
    } catch {
      setName(workflow.name);
    } finally {
      setIsEditing(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      handleSave();
    } else if (event.key === "Escape") {
      setName(workflow.name);
      setIsEditing(false);
    }
  }

  if (isEditing) {
    return (
      <Input
        disabled={updateWorkflow.isPending}
        ref={inputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className="h-7 w-auto min-w-25 px-2"
      />
    );
  }

  return (
    <BreadcrumbItem
      onClick={() => setIsEditing(true)}
      className="cursor-pointer hover:text-foreground transition-colors"
    >
      {workflow.name}
    </BreadcrumbItem>
  );
}
