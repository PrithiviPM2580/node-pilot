"use client";

import { type Node, type NodeProps, useReactFlow } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";
import { memo, useState } from "react";
import type { HTTPRequestFormSchema } from "../../schema/execution";
import { BaseExecutionNode } from "../base-execution-node";
import HttpRequestDialog from "./dialog";

type HttpRequestNodeData = {
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string;
};

type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const { setNodes } = useReactFlow();

  const status = "initial";

  function handleDialogSettings() {
    return setDialogOpen(true);
  }

  function handleSubmit(data: HTTPRequestFormSchema) {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === props.id) {
          return {
            ...node,
            data: {
              ...node.data,
              ...data,
            },
          };
        }

        return node;
      }),
    );
  }

  const nodeData = props.data;
  const description = nodeData?.endpoint
    ? `${nodeData.method || "GET"}: ${nodeData.endpoint}`
    : "Not configured";

  return (
    <>
      <HttpRequestDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={nodeData}
      />
      <BaseExecutionNode
        {...props}
        status={status}
        id={props.id}
        icon={GlobeIcon}
        name="HTTP Request"
        description={description}
        onSettings={handleDialogSettings}
        onDoubleClick={handleDialogSettings}
      />
    </>
  );
});

HttpRequestNode.displayName = "HttpRequestNode";
