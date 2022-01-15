/**
 * @author 
 */

// Import Section
import recommendationSrevice from "../../services/recommendationSrevice";


// Resolvers
const resolvers = 
{

    Query: 
    {
      
        
        recommendations:recommendationSrevice.recommendations,
     },
    Mutation:
    {
        // Resolver for uploadDocuments(input) : String
        saveRecommendation : recommendationSrevice.saveRecommendation,
        deleteRecommendation : recommendationSrevice.deleteRecommendation,
   
    }
};



// Export the resolvers
export default resolvers;