import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/nextauth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const session = await getServerSession(req, res, authOptions);
            if (!session) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            console.log(session);
            const { title, content, appointmentable, appointmentPrice, appointmentDuration, hashtags } = req.body;

            const post = await prisma.post.create({
                data: {
                    title,
                    content,
                    appointmentable: appointmentable === "true",
                    appointmentPrice: appointmentPrice ? parseFloat(appointmentPrice) : null,
                    appointmentDuration: appointmentDuration ? parseInt(appointmentDuration) : null,
                    authorId: session.user.id,
                    tags: {
                        connectOrCreate: hashtags.map((name: string) => ({
                            where: { name },
                            create: { name },
                        })),
                    },
                },
            });

            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({ error: "Error creating post" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
