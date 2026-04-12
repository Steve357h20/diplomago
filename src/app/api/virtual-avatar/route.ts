import { NextRequest, NextResponse } from 'next/server';

// 预设助手配置
const presetConfigs = [
  {
    id: 'default',
    name: 'AI 助手',
    description: '默认外交谈判助手',
    icon: 'lightbulb',
  },
];

// 获取助手配置
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const configId = searchParams.get('id');
  const listAll = searchParams.get('list');

  // 返回所有预设配置
  if (listAll === 'true') {
    return NextResponse.json({
      success: true,
      configs: presetConfigs,
    });
  }

  // 返回特定配置
  if (configId) {
    const config = presetConfigs.find((c) => c.id === configId);
    if (config) {
      return NextResponse.json({
        success: true,
        config,
      });
    }
    return NextResponse.json(
      { success: false, error: 'Config not found' },
      { status: 404 }
    );
  }

  // 默认返回第一个
  return NextResponse.json({
    success: true,
    config: presetConfigs[0],
    configs: presetConfigs,
  });
}

// 更新助手配置
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description } = body;

    return NextResponse.json({
      success: true,
      config: {
        id: 'custom',
        name: name || 'AI 助手',
        description: description || '自定义助手',
        icon: 'lightbulb',
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
