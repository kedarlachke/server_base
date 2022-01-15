// Import Section


import AuthServiceJWT from '../../services/authenticationJWT';


// Resolvers
const resolvers = 
{
    Query: 
    {
      
        currentUsernameJWT: AuthServiceJWT.currentUserUsernameJWT,
        users:AuthServiceJWT.users
    },

    Mutation:
    {
        signUpUsernameJWT : AuthServiceJWT.signUpUsernameJWT,
        signInUsernameJWT : AuthServiceJWT.signInUsernameJWT,
        saveUsername:AuthServiceJWT.saveUsername,
        deleteUsername:AuthServiceJWT.deleteUsername
    }
};



// Export the resolvers
export default resolvers;