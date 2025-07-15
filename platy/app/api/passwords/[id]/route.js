import { NextResponse } from 'next/server';
import { getDb } from '../sqlite';

export async function DELETE(req, context) {
  const db = await getDb();
  const { id } = await context.params;
  await db.run('DELETE FROM passwords WHERE id = ?', [id]);
  return new NextResponse(null, { status: 204 });
}
