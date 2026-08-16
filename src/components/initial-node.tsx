"use client";

import type { NodeProps } from "@xyflow/react";
import { PlusIcon } from "lucide-react";
import { memo, useState } from "react";
import { PlaceholderNode } from "./react-flow/placeholder-node";
import WorkflowNode from "./workflow-node";

export const InitialNode = memo((props: NodeProps) => {
  return (
    <WorkflowNode
      showToolbar={true}
      name="Initial Node"
      description="Click to add a node"
    >
      <PlaceholderNode {...props} onClick={() => {}}>
        <div className="cursor-pointer flex-center">
          <PlusIcon />
        </div>
      </PlaceholderNode>
    </WorkflowNode>
  );
});

InitialNode.displayName = "InitialNode";
