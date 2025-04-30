import { connectToDatabase } from './mongodb';
import { Job } from '@/data/jobs'; // Import your Job interface
import { ObjectId } from 'mongodb'; // Import ObjectId

export async function fetchAllJobs(): Promise<Job[]> {
  const { db } = await connectToDatabase();
  
  // Get all collection names
  const collections = await db.listCollections().toArray();
  const collectionNames = collections.map(col => col.name);

  let allJobs: Job[] = [];

  // Fetch jobs from each collection
  for (const collectionName of collectionNames) {
    const jobs = await db
      .collection(collectionName)
      .find({})
      .toArray();

    // Map MongoDB documents to your Job interface
    const mappedJobs: Job[] = jobs.map(job => ({
      id: job._id.toString(),
      title: job.job_title,
      company: job.company_name,
      location: job.location,
      salary: job.salary_offered,
      skills: job.skills,
      postedAt: job.time_when_posted,
      applyLink: job.apply_link,
      description: job.job_description,
      responsibilities: job.key_responsibilities ? [job.key_responsibilities] : [],
      type: 'full-time', // Default or derive from data if available
      experience: job.experience_level,
      aboutCompany: job.about_company || '', // Optional field
    }));

    allJobs = [...allJobs, ...mappedJobs];
  }

  return allJobs;
}

export async function fetchJobById(id: string): Promise<Job | null> {
  const { db } = await connectToDatabase();
  
  // Validate ObjectId
  if (!ObjectId.isValid(id)) {
    return null;
  }
  // Get all collection names
  const collections = await db.listCollections().toArray();
  const collectionNames = collections.map(col => col.name);

  // Search for the job in each collection
  for (const collectionName of collectionNames) {
    const job = await db
      .collection(collectionName)
      .findOne({ _id: new ObjectId(id) });

    if (job) {
      return {
        id: job._id.toString(),
        title: job.job_title,
        company: job.company_name,
        location: job.location,
        salary: job.salary_offered,
        skills: job.skills,
        postedAt: job.time_when_posted,
        applyLink: job.apply_link,
        description: job.job_description,
        requirements: job.key_responsibilities ? [job.key_responsibilities] : [],
        responsibilities: job.key_responsibilities ? [job.key_responsibilities] : [],
        type: 'full-time', // Default or derive from data if available
        experience: job.experience_level,
        aboutCompany: job.about_company || '', // Optional field
      };
    }
  }

  return null;
}