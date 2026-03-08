import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '여소남 OS',
  description: '여행사 문서 자동 처리 및 AI 콘텐츠 생성 시스템',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
