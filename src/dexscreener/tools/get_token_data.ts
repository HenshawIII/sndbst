import { PublicKey } from "@solana/web3.js";

export async function getTokenDataByAddress(mint: PublicKey) {
  try {
    if (!mint) {
      throw new Error("Mint address is required");
    }
    const response = await fetch(`/api/jupiter/token/${mint.toString()}`);
    const token = await response.json();
    return token;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error fetching token data: ${error.message}`);
    }
    throw new Error('Unknown error occurred while fetching token data');
  }
} 