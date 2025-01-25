import { NextResponse } from 'next/server'
import { uploadToS3 } from '@/lib/s3'

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const fileName = `${Date.now()}-${file.name}`

  try {
    const url = await uploadToS3(buffer, fileName)
    return NextResponse.json({ url })
  } catch (error) {
    console.error('Error in upload:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

