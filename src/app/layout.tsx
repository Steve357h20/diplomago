import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '外交谈判模拟平台 | Diplomatic AI',
    template: '%s | Diplomatic AI',
  },
  description:
    'AI驱动的外交谈判训练平台，通过智能模拟真实谈判场景，帮助提升谈判技巧和策略制定能力。',
  keywords: [
    '外交谈判',
    'AI模拟',
    '谈判训练',
    '外交培训',
    '策略模拟',
    '国际关系',
    'Diplomatic AI',
  ],
  authors: [{ name: 'Diplomatic AI Team' }],
  generator: 'Coze Code',
  // icons: {
  //   icon: '',
  // },
  openGraph: {
    title: '外交谈判模拟平台 | Diplomatic AI',
    description:
      'AI驱动的外交谈判训练平台，通过智能模拟真实谈判场景，帮助提升谈判技巧。',
    url: 'https://diplomatic-ai.example.com',
    siteName: 'Diplomatic AI',
    locale: 'zh_CN',
    type: 'website',
  },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'Coze Code | Your AI Engineer is Here',
  //   description:
  //     'Build and deploy full-stack applications through AI conversation. No env setup, just flow.',
  //   // images: [''],
  // },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-CN">
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
