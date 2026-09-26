"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { copyTextToClipboard } from "@/lib/copy";
import type { ToolAccess, ToolCapability } from "@/lib/tools/types";

export type ToolRuntime = {
  access: ToolAccess;
  capabilities: ReadonlySet<ToolCapability>;
  hasCapability: (capability: ToolCapability) => boolean;
  requireCapability: (capability: ToolCapability) => void;
  clipboard: {
    writeText: (value: string) => Promise<boolean>;
  };
};

const ToolRuntimeContext = createContext<ToolRuntime | null>(null);

export function ToolRuntimeProvider({
  access,
  capabilities,
  children,
}: {
  access: ToolAccess;
  capabilities: ToolCapability[];
  children: ReactNode;
}) {
  const runtime = useMemo<ToolRuntime>(() => {
    const grantedCapabilities = new Set(capabilities);

    const requireCapability = (capability: ToolCapability) => {
      if (!grantedCapabilities.has(capability)) {
        throw new Error(`Tool capability "${capability}" was not granted.`);
      }
    };

    return {
      access,
      capabilities: grantedCapabilities,
      hasCapability: (capability) => grantedCapabilities.has(capability),
      requireCapability,
      clipboard: {
        writeText: async (value: string) => {
          requireCapability("clipboard");
          return copyTextToClipboard(value);
        },
      },
    };
  }, [access, capabilities]);

  return <ToolRuntimeContext.Provider value={runtime}>{children}</ToolRuntimeContext.Provider>;
}

export function useToolRuntime(): ToolRuntime {
  const runtime = useContext(ToolRuntimeContext);
  if (!runtime) {
    throw new Error("useToolRuntime must be used within a ToolRuntimeProvider.");
  }
  return runtime;
}
