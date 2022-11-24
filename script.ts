import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main(){
  //you will write your prisma client queries here
  const user=await prisma.user.create({data: {name:"Kyle"}})
  console.log(user)
}

main()
  .catch(e=>{
    console.log(e.message)
  })
  .finally(async()=>{
    await prisma.$disconnect()
  })