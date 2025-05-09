import { createVercelAITools } from 'solana-agent-kit';
import { Tool as AITool } from 'ai';

export type Tool<TParams = any, TResult = any> = {
  description: string;
  parameters: {
    type: string;
    properties: Record<string, { type: string }>;
    required: string[];
  };
  execute: (args: TParams) => Promise<TResult>;
};

export interface AgentTool {
  name: string;
  description: string;
}

export async function getAvailableTools(): Promise<AgentTool[]> {
  const response = await fetch('/api/agent-tools');
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to get tools');
  }
  
  return data.tools;
}

export async function executeTool(tool: string, params: any) {
  const response = await fetch('/api/agent-tools', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tool, params }),
  });
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to execute tool');
  }
  
  return data.result;
}

// Create a wrapper for the tools that the agent can use
export function createAgentTools(): Record<string, Tool<any, any>> {
  return {
    getTokenPrice: {
      description: "Get the current price of a token",
      parameters: {
        type: "object",
        properties: {
          tokenId: { type: "string" }
        },
        required: ["tokenId"]
      },
      execute: async (params: { tokenId: string }) => {
        return executeTool('getTokenPrice', params);
      }
    },
    getTokenMarketData: {
      description: "Get market data for a token",
      parameters: {
        type: "object",
        properties: {
          tokenId: { type: "string" }
        },
        required: ["tokenId"]
      },
      execute: async (params: { tokenId: string }) => {
        return executeTool('getTokenMarketData', params);
      }
    }
  };
} 