import { NextRequest, NextResponse } from 'next/server';
import { generateContent, generateContentComparison, TravelPackage, AIModel } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { packageData, contentType, model, compare }: {
      packageData: TravelPackage;
      contentType: string;
      model: AIModel;
      compare?: boolean;
    } = body;

    if (!packageData) {
      return NextResponse.json(
        { error: '여행 상품 데이터가 필요합니다.' },
        { status: 400 }
      );
    }

    if (compare) {
      // 모델 비교
      const results = await generateContentComparison(packageData, contentType);
      return NextResponse.json({ results });
    } else {
      // 단일 모델 생성
      if (!model) {
        return NextResponse.json(
          { error: 'AI 모델을 선택해주세요.' },
          { status: 400 }
        );
      }

      const content = await generateContent(packageData, contentType, model);
      return NextResponse.json({ content });
    }
  } catch (error) {
    console.error('AI 생성 API 오류:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : '콘텐츠 생성에 실패했습니다.'
      },
      { status: 500 }
    );
  }
}