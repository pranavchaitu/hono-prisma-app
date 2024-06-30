// import { PrismaClient } from "@prisma/client"
// import { withAccelerate } from "@prisma/extension-accelerate";

// interface User {
//     username : string;
//     email : string;
//     password : string
// }

// let prisma : any;

// export async function createConnection(url : string) : Promise<void> {    
//     if(!prisma) {
//         console.log(url);
//         prisma = new PrismaClient({
//             datasources : {
//                 db : {
//                     url
//                 }
//             }
//         }).$extends(withAccelerate()) 
//         console.log(prisma);
//     }
// }

// export async function createUser ( data : User) : Promise<User> {
//     const res = await prisma.user.create({
//         data
//     })
//     return res
// }

// export async function changePassword(password : string,id : number) : Promise<User> {
//     const res = await prisma.user.update({
//         where : {
//             id : id
//         },
//         data : {
//             password : password
//         }
//     })
//     return res
// }