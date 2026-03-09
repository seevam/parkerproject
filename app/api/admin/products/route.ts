import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      description,
      price,
      category,
      imageUrl,
      stock,
      isCustomizable,
      customizationPrice,
    } = await req.json();

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        imageUrl: imageUrl || null,
        stock: parseInt(stock),
        isCustomizable: isCustomizable || false,
        customizationPrice: isCustomizable && customizationPrice
          ? parseFloat(customizationPrice)
          : 0,
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
