import type { ScriptToExecute } from '@typebot.io/schemas';
export declare const executeScript: ({ content, args }: ScriptToExecute) => Promise<void>;
export declare const executeCode: ({ args, content, }: {
    content: string;
    args: Record<string, unknown>;
}) => Promise<void>;
//# sourceMappingURL=executeScript.d.ts.map