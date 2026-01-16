import { prisma } from "@/lib/prisma";
import { generateShortCode, isValidUrl } from "@/lib/utils";
import redis from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

        // If we want to get the data from body of fetch
        const { url } = await req.json();

        // Validation
        if (!url) {
            return NextResponse.json(
                { error: "Invalid URL provided" },
                { status: 400 }
            )
        }

        // shorten the code 
        const shortCode = generateShortCode();

        // store in db
        const urlRecord = await prisma.url.create({
            data: { shortCode, originalUrl: url, }
        })

        await redis.setex(`url:${shortCode}`, 86400, url);

        return Response.json({
            shortCode,
            shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${shortCode}`,
            originalUrl: url
        })
    } catch (error) {
        console.error("Error shortening url", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}