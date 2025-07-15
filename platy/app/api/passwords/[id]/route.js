import { NextResponse } from 'next/server';
import { getDb } from '../sqlite';

export async function DELETE(req, context) {
  const db = await getDb();
  const { id } = context.params;
  const { searchParams } = new URL(req.url);
  const user = searchParams.get('user');
  if (!user) {
    return NextResponse.json({ error: 'Missing user' }, { status: 400 });
  }
  // Only delete if the password belongs to the user
  const result = await db.run('DELETE FROM passwords WHERE id = ? AND user = ?', [id, user]);
  if (result.changes === 0) {
    return NextResponse.json({ error: 'Not found or not allowed' }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
