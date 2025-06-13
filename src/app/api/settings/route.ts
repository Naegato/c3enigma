import * as fs from 'fs';

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token || token !== 'settingscedriccechampion') {
    console.error('Unauthorized access attempt');
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const data = await request.json();

  const res = await GET();
  const colors = await res.json();

  fs.writeFileSync('./src/data/settings.json', JSON.stringify({
    colors: [
      ...colors.colors,
      data.color,
    ]
  }, null, 2));

  return Response.json({})
}

export async function DELETE(request: Request) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token || token !== 'settingscedriccechampion') {
    console.error('Unauthorized access attempt');
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const data = await request.json();

  const res = await GET();
  const colors: { colors: string[] } = await res.json();

  fs.writeFileSync('./src/data/settings.json', JSON.stringify({
    colors: colors.colors.filter(color => data.color !== color),
  }, null, 2));

  return Response.json({})
}


export async function GET() {
  const data = fs.readFileSync('./src/data/settings.json');

  return Response.json(JSON.parse(data as unknown as string));
}