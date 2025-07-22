import { NextResponse } from 'next/server';
import { getDb } from './sqlite';
import { verifyTideCloakToken } from '@tidecloak/nextjs/server'
import tcConfig from '../../../tidecloak.json'

export async function GET(req) {
  const db = await getDb();
  const user = await verifyRequest(req);
  if (user instanceof NextResponse) {
    return user; // If the user is not authenticated, return the response directly
  }
  const passwords = await db.all('SELECT * FROM passwords WHERE user = ?', [user]);
  return NextResponse.json(passwords);
}

export async function POST(req) {
  const db = await getDb();
  const user = await verifyRequest(req);
  if (user instanceof NextResponse) {
    return user; // If the user is not authenticated, return the response directly
  }
  const { name, value } = await req.json();
  if (!name || !value) {
    return NextResponse.json({ error: 'Missing name or value' }, { status: 400 });
  }
  const result = await db.run('INSERT INTO passwords (name, value, user) VALUES (?, ?, ?)', [name, value, user]);
  const newPassword = await db.get('SELECT * FROM passwords WHERE id = ?', [result.lastID]);
  return NextResponse.json(newPassword, { status: 201 });
}

export async function verifyRequest(request) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'Unauthorized: Missing or invalid token' },
      { status: 401 }
    )
  }

  const token = authHeader.split(' ')[1]

  try {
    const user = await verifyTideCloakToken(tcConfig, token);

    if (!user) {
      return NextResponse.json(
        { error: 'Forbidden: Invalid token or insufficient role' },
        { status: 403 }
      )
    }
    if(!user.vuid) {
      return NextResponse.json(
        { error: 'Forbidden: User ID not found in token' },
        { status: 403 }
      )
    }
    // Return the user ID or any other user information you need
    return user.vuid;
  } catch (err) {
    console.error('Token verification failed:', err)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}