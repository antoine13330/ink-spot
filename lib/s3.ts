import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToS3(file: Buffer, fileName: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Body: file,
    ContentType: "image/jpeg",
  });

  try {
    await s3Client.send(command);
    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
}

