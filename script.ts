import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  //you will write your prisma client queries here
  await prisma.user.deleteMany()
  const createdUsers = await prisma.user.createMany({
    data: [
      {
        name: "Kyle",
        email: "Kyle@test.com",
        age: 27,
      },
      {
        name: "Kyle",
        email: "Kyle2@test.com",
        age: 17,
      },
      {
        name: "Sally",
        email: "Sally@test.com",
        age: 32,
      },
      {
        name: "Sally",
        email: "Sally2@test.com",
        age: 21,
      },
      {
        name: "Sally",
        email: "Sally3@test.com",
        age: 12,
      },
    ],

  })



  //returns one user using the unique fields
  const userUnique = await prisma.user.findUnique({
    where: {
      age_name: {
        age: 27,
        name: "Kyle"
      }
    },
  })

  const usersSally = await prisma.user.findMany({
    where: {
      name: { in: ["Sally", "Kyle"] },
      age: { lt: 20 },
      email: { contains: "@test.com" }
    },
    take: 2,
    // skip: 1,
    orderBy: {
      age: "asc"
    }
  })


  //updateMany changes multiple entries based on the where object
  //using update in the singular form requires a unique field to return one entry back
  const userUpdate = await prisma.user.update({
    where: {
      email: "Sally@test.com"
    },
    data: {
      email: "Sally3@test3.com",
      userPreference: {
        create: {
          emailUpdates: true
        }
      }
    }
  })
  console.log(userUpdate)
}

main()
  .catch(e => {
    console.log(e.message)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })