import * as fs from 'fs';

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token || token !== 'cedriccechampion') {
    console.error('Unauthorized access attempt');
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const data = await request.json();
  fs.writeFileSync('./src/data/colors.json', JSON.stringify(data, null, 2));

  return Response.json({})
}

export async function GET() {
  const data = fs.readFileSync('./src/data/colors.json');

  return Response.json(JSON.parse(data as unknown as string));
}