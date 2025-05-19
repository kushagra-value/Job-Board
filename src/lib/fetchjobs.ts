import { connectToDatabase } from "./mongodb";
import { Job } from "@/data/jobs";
import { ObjectId } from "mongodb";

export async function fetchAllJobs(): Promise<Job[]> {
  const { db } = await connectToDatabase();

  // Get all collection names
  const collections = await db.listCollections().toArray();
  const collectionNames = collections.map((col) => col.name);

  let allJobs: Job[] = [];

  // Fetch jobs from each collection
  for (const collectionName of collectionNames) {
    const jobs = await db.collection(collectionName).find({}).toArray();

    // Map MongoDB documents to your Job interface
    const mappedJobs: Job[] = jobs.map((job) => ({
      id: job._id.toString(),
      job_id: job.job_id || "",
      title: job.title || "",
      company: job.company_name || "",
      location: job.location || "",
      salary: job.salary_offered || "Not Disclosed",
      skills: job.skills || [],
      postedAt: job.time_when_posted || "N/A",
      applyLink: job.apply_options[0].link || job.share_link || "",
      description: job.description || "",
      responsibilities: job.key_responsibilities
        ? [job.key_responsibilities]
        : [],
      type: "full-time",
      experience: job.experience_level || "",
      aboutCompany: job.about_company || "",
      about_the_role: job.about_the_role || "",
      collection: collectionName,
    }));

    allJobs = [...allJobs, ...mappedJobs];
  }

  return allJobs;
}

export async function fetchJobById(id: string): Promise<Job | null> {
  const { db } = await connectToDatabase();

  if (!ObjectId.isValid(id)) {
    return null;
  }

  const collections = await db.listCollections().toArray();
  const collectionNames = collections.map((col) => col.name);

  for (const collectionName of collectionNames) {
    const job = await db
      .collection(collectionName)
      .findOne({ _id: new ObjectId(id) });

    if (job) {
      return {
        id: job._id.toString(),
        job_id: job.job_id || "",
        title: job.title || "",
        company: job.company_name || "",
        location: job.location || "",
        salary: job.salary_offered || "Not Disclosed",
        skills: job.skills || [],
        postedAt: job.time_when_posted || "N/A",
        applyLink: job.apply_options[0].link || job.share_link || "",
        description: job.description || "",
        responsibilities: job.key_responsibilities
          ? [job.key_responsibilities]
          : [],
        type: "full-time",
        experience: job.experience_level || "",
        aboutCompany: job.about_company || "",
        about_the_role: job.about_the_role || "",
        collection: collectionName,
      };
    }
  }

  return null;
}
