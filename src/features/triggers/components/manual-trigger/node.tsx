"use client";

import type { NodeProps } from "@xyflow/react";
import { MousePointerIcon } from "lucide-react";
import { memo, useState } from "react";
import ManualTriggerDialog from "../../../executions/components/http-request/dialog";
import { BaseTriggerNode } from "../base-trigger-node";

export const ManualTriggerNode = memo((props: NodeProps) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  function handleOpenSettings() {
    return setDialogOpen(true);
  }

  const status = "initial";
  return (
    <>
      <ManualTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <BaseTriggerNode
        {...props}
        status={status}
        icon={MousePointerIcon}
        name="When clicking 'Execute workflow'"
        description="Triggered manually by the user"
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});
