import { prisma } from "@/lib/prisma";
import redis from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ code: string }> }
) {
    try {
        const { code } = await params;

        if (!code) {
            return NextResponse.json({ error: "Invalid code" }, { status: 400 });
        }

        // search in cache
        const cachedUrl = await redis.get(`url:${code}`);

        if (cachedUrl) {
            // Increment clicks asynchronously without blocking response
            prisma.url.update({
                where: { shortCode: code },
                data: { clicks: { increment: 1 } },
            }).catch(console.error);

            return NextResponse.redirect(cachedUrl);
        }

        const urlRecord = await prisma.url.findUnique({
            where: {
                shortCode: code,
            },
        });

        if (!urlRecord) {
            return NextResponse.json({ error: "URL not found" }, { status: 404 });
        }

        await redis.setex(`url:${code}`, 86400, urlRecord.originalUrl);

        await prisma.url.update({
            where: { shortCode: code },
            data: { clicks: { increment: 1 } },
        });

        return NextResponse.redirect(urlRecord.originalUrl);
    } catch (error) {
        console.error("Error redirecting", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
