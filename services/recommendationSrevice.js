import dotenv from 'dotenv';
dotenv.config();
 


import masterdataServices from '../services/masterdataServices';
import { PrismaClient } from '.prisma/client/index';
import datetimeService from '../services/dateTimeServices'; 
import authenticationJWT from '../services/authenticationJWT'




  const  saveRecommendation =
  async (dataJSON,context) => {

     const {login_username} =context;
     authenticationJWT.checkUser(login_username);

    const { applicationid, client, lang, z_id, t_id,
      name,
      recodate,
      cmp,
      addupto,
      sl,
      target1,
      target2,
      target3,
      target4,
      target5,
      target6,
      target7,
      target8,
      target9,
      weightage,
      timeframe } = dataJSON;

    if (!name) { throw new Error('You must provide and name.'); }
  
    const prisma = new PrismaClient()


    

    if (z_id === null || z_id === undefined || z_id === "" ) {

      
      const _idGenerated = await masterdataServices.getUniqueID();

    

      const recotobeCreated=datetimeService.setDateUser( {
        z_id: _idGenerated,
        applicationid, client, lang, t_id,
    name,
    recodate,
    cmp,
    addupto,
    sl,
    target1,
    target2,
    target3,
    target4,
    target5,
    target6,
    target7,
    target8,
    target9,
    weightage,
    timeframe
      },'I',login_username);
 
      const recommendationCreated = await prisma.recommendations.create({
        data: recotobeCreated
      })
      await prisma.$disconnect();
      return recommendationCreated;



    }
    else {
      const recotobeUpdated=datetimeService.setDateUser(  {

        name,
        recodate,
        cmp,
        addupto,
        sl,
        target1,
        target2,
        target3,
        target4,
        target5,
        target6,
        target7,
        target8,
        target9,
        weightage,
        timeframe
      },'U',login_username);
      const recommendationUpdated = await prisma.recommendations.update({

        where: {

          z_id
        },
        data: recotobeUpdated
      })

      await prisma.$disconnect();
      return recommendationUpdated;


    }





  }






  const recommendations = async (args, context, info) => {
    const { applicationid, client, lang, z_id } = args
  
    const {login_username} =context;
    authenticationJWT.checkUser(login_username);


      try {
        const prisma = new PrismaClient()

        if (z_id === null || z_id === undefined || z_id === "") {
      
         const recommendations_list = await prisma.recommendations.findMany({
            where: {
              applicationid :applicationid
      
            }
          })
          await prisma.$disconnect()
          return recommendations_list;
      

        
        }
        else{

        
          const recommendations_list = await prisma.recommendations.findMany({
            where: {
              applicationid,
              lang,
              client,
              z_id
            }
          })
          await prisma.$disconnect()
          return recommendations_list;
          
        }

    
      }
      catch (e) {
    
    
        throw new Error('Error fetching Recommendations');
      }




    }
  
  
  






  


  const deleteRecommendation =
  async (
    dataJSON,context
  ) => {

    const {login_username} =context;
    authenticationJWT.checkUser(login_username);

    const { applicationid, client, lang, username, z_id } =dataJSON;


    try {
      const prisma = new PrismaClient()
      const deletedRecommendation = await prisma.recommendations.delete({
        where: {
          z_id
        },
      })

      await prisma.$disconnect()
      return deletedRecommendation;
    } catch (err) {

      throw new Error('Unable to delete Recommendation');
    }

  }

  export default {deleteRecommendation,recommendations,saveRecommendation}
