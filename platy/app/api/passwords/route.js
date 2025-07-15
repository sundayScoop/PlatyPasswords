import { NextResponse } from 'next/server';
import { getDb } from './sqlite';

export async function GET() {
  const db = await getDb();
  const passwords = await db.all('SELECT * FROM passwords');
  return NextResponse.json(passwords);
}

export async function POST(req) {
  const db = await getDb();
  const { name, value } = await req.json();
  if (!name || !value) {
    return NextResponse.json({ error: 'Missing name or value' }, { status: 400 });
  }
  const result = await db.run('INSERT INTO passwords (name, value) VALUES (?, ?)', [name, value]);
  const newPassword = await db.get('SELECT * FROM passwords WHERE id = ?', [result.lastID]);
  return NextResponse.json(newPassword, { status: 201 });
}
