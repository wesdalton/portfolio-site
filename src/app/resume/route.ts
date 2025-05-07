import { NextResponse } from 'next/server';

export function GET() {
  // Permanent redirect to the Google Drive PDF
  return NextResponse.redirect(
    'https://drive.google.com/file/d/1qOQ7VHSgNberDKJLCQIjW6VbksGKJ2pMvHnHG0VNkjw/preview',
    { status: 308 } // 308 = Permanent Redirect
  );
}