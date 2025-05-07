import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  redirect('/CIS_5190_Final_Report.pdf');
}