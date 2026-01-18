import { prisma } from "../lib/prisma.js"

async function main() {
    try {
        await prisma.team.createMany({
            data: [
                { name: "A", voteCount: 0 },
                { name: "B", voteCount: 0 },
                { name: "C", voteCount: 0 },
            ],
            skipDuplicates: true
        })
        console.log("seed data created");

    } catch (error) {
        throw new Error("Failed to seed data")
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })