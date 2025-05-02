// src/app/api/agents/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }, // ← note Promise<…>
) {
  // await the promise so you get the real id
  const { id: agentId } = await params;

  try {
    await prisma.agent.update({
      where: { id: agentId },
      data: { visitCount: { increment: 1 } },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to increment visitCount for', agentId, error);
    return NextResponse.json(
      { success: false, message: 'Could not update visitCount' },
      { status: 500 },
    );
  }
}
