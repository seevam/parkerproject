import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const {
      title,
      description,
      category,
      imageUrl,
      modelFileUrl,
      isPremade,
      price,
    } = await req.json();

    const project = await prisma.printProject.create({
      data: {
        title,
        description,
        category,
        imageUrl: imageUrl || null,
        modelFileUrl: modelFileUrl || null,
        isPremade: isPremade || false,
        price: isPremade && price ? parseFloat(price) : null,
      },
    });

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
