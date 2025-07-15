import { NextResponse } from 'next/server';
import { getDb } from './sqlite';

export async function GET(req) {
  const db = await getDb();
  const { searchParams } = new URL(req.url);
  const user = searchParams.get('user');
  if (!user) {
    return NextResponse.json({ error: 'Missing user' }, { status: 400 });
  }
  const passwords = await db.all('SELECT * FROM passwords WHERE user = ?', [user]);
  return NextResponse.json(passwords);
}

export async function POST(req) {
  const db = await getDb();
  const { searchParams } = new URL(req.url);
  const user = searchParams.get('user');
  const { name, value } = await req.json();
  if (!user || !name || !value) {
    return NextResponse.json({ error: 'Missing user, name or value' }, { status: 400 });
  }
  const result = await db.run('INSERT INTO passwords (name, value, user) VALUES (?, ?, ?)', [name, value, user]);
  const newPassword = await db.get('SELECT * FROM passwords WHERE id = ?', [result.lastID]);
  return NextResponse.json(newPassword, { status: 201 });
}
