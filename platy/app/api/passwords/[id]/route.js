import { NextResponse } from 'next/server';
import { getDb } from '../sqlite';
import { verifyRequest } from '../route';

export async function DELETE(req, context) {
  const db = await getDb();
  const { id } = await context.params;
  const user = await verifyRequest(req);
  if (user instanceof NextResponse) {
    return user; // If the user is not authenticated, return the response directly
  }
  // Only delete if the password belongs to the user
  const result = await db.run('DELETE FROM passwords WHERE id = ? AND user = ?', [id, user]);
  if (result.changes === 0) {
    return NextResponse.json({ error: 'Not found or not allowed' }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
