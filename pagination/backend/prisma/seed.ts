import { prisma } from "../lib/prisma.js"


const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys', 'Health', 'Automotive']
const adjectives = ['Premium', 'Durable', 'Stylish', 'Compact', 'Advanced', 'Eco-friendly', 'Ergonomic', 'Smart']
const nouns = ['Widget', 'Gadget', 'Device', 'Tool', 'Accessory', 'System', 'Solution', 'Kit']


async function main() {
    console.log('Start seeding ...')

    const products = []

    for (let i = 0; i < 50; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)]
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
        const noun = nouns[Math.floor(Math.random() * nouns.length)]
        const name = `${adjective} ${noun} ${i + 1}`

        products.push({
            name,
            description: `This is a high-quality ${name.toLowerCase()} perfect for your needs in the ${category} category.`,
            price: parseFloat((Math.random() * 100 + 5).toFixed(2)),
            inStock: Math.random() > 0.2, // 80% chance of being in stock
            category: category!,
        })
    }

    await prisma.product.createMany({
        data: products,
    })

    console.log(`Seeded ${products.length} products.`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })