import { NextResponse } from 'next/server';
import { fetchAllJobs, fetchJobById } from '@/lib/fetchjobs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      // Fetch a single job by ID
      const job = await fetchJobById(id);
      if (!job) {
        return NextResponse.json({ error: 'Job not found' }, { status: 404 });
      }
      return NextResponse.json(job);
    } else {
      // Fetch all jobs
      const jobs = await fetchAllJobs();
      return NextResponse.json(jobs);
    }
  } catch (error) {
    console.error('Error in /api/jobs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}