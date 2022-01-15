
// Import section
import dotenv from 'dotenv'
dotenv.config()
import morgan from 'morgan'
import proxy from 'express-http-proxy'
import express from 'express';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import resolvers from './graphQL/resolvers';


import sysDateTime from './services/dateTimeServices';
import authenticationJWT from './services/authenticationJWT'
import multer from 'multer';
// Importing types
import typeDefs from './graphQL/types';




var whitelist = [
'http://localhost:8080',
'http://localhost:8081', 
'http://evil.com/']











//IMPORTING ENV vARIABLE




// Make executable schema
let graphQLSchema = buildSchema(typeDefs);
//Importing resolvers
//const resolvers ='';

//Import Additional for Authentication


// Set the port number
const PORT = process.env.MOMOAPIPORT;

// Initialize the app
const server = express();





//APP SETUP
//server.use(morgan('combined'));



server.use('/md', proxy('http://81.4.102.11:4466/',''));




var myLogger = function (req, res, next) {
  next()
}






server.use(cors());

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// simple middleware function
server.use((req, res, next)=>{
  console.log("Request received at : " + sysDateTime.sysdate_yyyymmdd() + "  "+ sysDateTime.systime_hh24mmss());  
  next();
});


// Use multer middleware to read the files from multipart-request
// Use memory storage
server.use(multer({
  storage: multer.memoryStorage()
}).any());






server.use((req, res, next)=>{
  console.log("Request received at : " + sysDateTime.sysdate_yyyymmdd() + "  "+ sysDateTime.systime_hh24mmss()); 

  next();
});












// New GraphQL endpoint [ Send request and reponse in context ]
server.use('/gqlapi',graphqlHTTP(async (request, response) => {

  const login_username=await authenticationJWT.getUsername(request); 


 return {
    schema: graphQLSchema,
    rootValue: resolvers,
    graphiql: true,
    context: { request, response ,login_username}
  }
  
}
  
  
 


));  


//router(server);
//server.use(express.static(path.join(__dirname,"public")));
server.use(express.static('public'));



server.get('*', function(req, res){
  res.sendFile('index.html', { root: 'public' });
});


// Start the server

server.listen(PORT,process.env.SERVERIP, () => {
  console.log(`GraphQL Server is now running on http://${process.env.SERVERIP}:${PORT}/gqlapi`);
  console.log(`Go to http://${process.env.SERVERIP}:${PORT}/gqlapi to run queries!`);
  console.log('------------------------------------------------------');
});

