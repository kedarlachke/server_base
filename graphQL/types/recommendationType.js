const typeDefs = `

    # recommendationItem Type
    type RecommendationItemType
    {
        label:String,
        value:String
    }

    # recommendation Type
    type RecommendationType
    {       z_id: String,
            t_id: String,
            applicationid : String,
            client: String ,
            lang: String ,
            name    :   String,
            recodate   :   String,
            cmp   :   String,
            addupto   :   String,
            sl   :   String,
            target1   :   String,
            target2   :   String,
            target3   :   String,
            target4   :   String,
            target5   :   String,
            target6   :   String,
            target7   :   String,
            target8   :   String,
            target9   :   String,
            weightage   :   String,
            timeframe   :   String,
            cdate       :   String,
            ctime       :   String,
            cuser       :   String,
            udate       :   String,
            utime       :   String,
            uuser       :   String,
            ddate       :   String,
            dtime       :   String,
            duser       :   String,
            isdeleted   :   String
    }
    # Query Type
    type Query
    {
        recommendations    (
            applicationid    :   String!,
            client    :   String!,
            lang   :   String!,
            z_id : String
        ):[RecommendationType]

        recommendationItems:[RecommendationItemType]
        
  }
    # Mutation Type
    type Mutation
    {
        saveRecommendation
         (  
             applicationid : String,
            client: String ,
            lang: String ,
            z_id: String,
            t_id:  String,
            name    :   String,
            recodate   :   String,
            cmp   :   String,
            addupto   :   String,
            sl   :   String,
            target1   :   String,
            target2   :   String,
            target3   :   String,
            target4   :   String,
            target5   :   String,
            target6   :   String,
            target7   :   String,
            target8   :   String,
            target9   :   String,
            weightage   :   String,
            timeframe   :   String,
            username   :   String,
         )  : RecommendationType


         deleteRecommendation
         (
            applicationid : String,
            client: String ,
            lang: String ,
            username:String,
            z_id:String
         )  : RecommendationType



    }

`
// Export the typeDefs
export default typeDefs;