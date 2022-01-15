import {
  getStocksQry 
} from '../common/sqlQueries';

import { PrismaClient } from '.prisma/client/index';






const getStocks = async (args, context, info) =>
{

    try 
    {
        const prisma = new PrismaClient()
        const result = await prisma.$queryRaw`select distinct name from vstockinfo`
       await prisma.$disconnect();
       return result;        
    } 
    catch (error) 
    {
        return error;    
    }

}


const getUniqueID = async () =>
{

    try 
    {
         const prisma = new PrismaClient()
        const result = await prisma.$queryRaw`select UUID() AS z_id`
       await prisma.$disconnect();
       return result[0].z_id  ;        
    } 
    catch (error) 
    {
        return error;    
    }



}


export default {getStocks,getUniqueID}