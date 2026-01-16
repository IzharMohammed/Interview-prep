import { prisma } from "@/lib/prisma";
import redis from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    try {
        // get the code
        const { shortCode } = await req.json()

        // search in cache

        const cachedUrl = await redis.getex(`url:${shortCode}`)
        if (cachedUrl) {
            await prisma.url.update({
                where: { shortCode: cachedUrl },
                data: { clicks: { increment: 1 } }
            }).catch(console.error)

            return NextResponse.redirect(
                cachedUrl
            )
        }

        const urlRecord = await prisma.url.findUnique({
            where: {
                shortCode
            },
        })

        if (!urlRecord) {
            return NextResponse.json(
                { error: "URL not found" },
                { status: 404 }
            )
        }

        await redis.setex(`url:${shortCode}`, 86400, urlRecord.originalUrl)

        await prisma.url.update({ where: { shortCode }, data: { clicks: { increment: 1 } } })

        return NextResponse.redirect(urlRecord.originalUrl)
    } catch (error) {
        console.error("Error redirecting", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}