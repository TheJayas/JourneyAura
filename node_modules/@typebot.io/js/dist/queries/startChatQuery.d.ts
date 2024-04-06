import { InitialChatReply } from '@/types';
import { StartFrom } from '@typebot.io/schemas';
type Props = {
    typebot: string | any;
    stripeRedirectStatus?: string;
    apiHost?: string;
    startFrom?: StartFrom;
    isPreview: boolean;
    prefilledVariables?: Record<string, unknown>;
    resultId?: string;
};
export declare function startChatQuery({ typebot, isPreview, apiHost, prefilledVariables, resultId, stripeRedirectStatus, startFrom, }: Props): Promise<{
    data: InitialChatReply;
    error?: undefined;
} | {
    error: unknown;
    data?: undefined;
}>;
export {};
//# sourceMappingURL=startChatQuery.d.ts.map