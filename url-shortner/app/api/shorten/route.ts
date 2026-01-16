import { prisma } from "@/lib/prisma";
import { isValidUrl } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

        // If we want to get the data from body of fetch
        const { url } = await req.json();

        // Validation
        if (!url || isValidUrl(url)) {
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

        await redis

        return Response.json({
            shortCode: "qwertyui"
        })
    } catch (error) {

    }
}