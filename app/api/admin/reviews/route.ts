import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const reviews = await prisma.gadgetReview.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, gadgetName, description, videoUrl, thumbnail, rating } = await req.json();

    const review = await prisma.gadgetReview.create({
      data: {
        title,
        gadgetName,
        description,
        videoUrl,
        thumbnail: thumbnail || null,
        rating: rating ? parseFloat(rating) : null,
      },
    });

    return NextResponse.json({ success: true, review });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}
