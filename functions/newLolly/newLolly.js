const { ApolloServer, gql } = require('apollo-server-lambda')
const { default: Axios } = require('axios')
const faunadb = require('faunadb'),
  q = faunadb.query
const shortid = require('shortid')
require('dotenv').config() 

const typeDefs = gql`
  type Query {
      getLollies: [Lolly!]
      getLolly(id: String!): Lolly!
  }
  type Lolly {
    recipientName: String!
    message: String!
    senderName: String!
    flavourTop: String!
    flavourMiddle: String!
    flavourBottom: String!
    lollyPath: String!
  }
  type Mutation {
    createLolly(recipientName: String!, message: String!, senderName: String!, flavourTop: String!, flavourMiddle: String!,flavourBottom: String!): Lolly
  }
`

const resolvers = {
  Query: {
    getLollies: async () => {
      try { 
        const client = new faunadb.Client({ secret: process.env.FAUNA_SECRET })

        const result = await client.query(
          q.Map(q.Paginate(q.Match(q.Index('lolly_by_name'))),
          q.Lambda(x => q.Get(x)))
        )
        return result.data.map(d => {
          return{ 
            recipientName: d.data.recipientName,
            senderName: d.data.senderName,
            message: d.data.message,
            lollyPath: d.data.lollyPath,
            flavourTop: d.data.flavourTop,
            flavourMiddle: d.data.flavourMiddle,
            flavourBottom: d.data.flavourBottom
          }
        })
      } catch (err){
        console.log(err)
      }
    },
    getLolly: async (_,{ id }) => {
      console.log(id)
      try{
        const client = new faunadb.Client({ secret: process.env.FAUNA_SECRET })

        const result = await client.query(
          q.Get(q.Match(q.Index('lolly_by_id'), id))
        )

        return result.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  Mutation: {
    createLolly: async (_, args) => {
      try {
        const client = new faunadb.Client({ secret: process.env.FAUNA_SECRET })
        const id = shortid.generate()
        args.lollyPath = id

        const result = await client.query(
          q.Create(q.Collection('lolly'), {
            data: args
          })
        )

        Axios 
        .post(process.env.NETLIFY_BUILD_HOOK)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        
        return result.data
      } catch (err){
        console.log(err)
      }
    } 
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()
















// const { ApolloServer, gql } = require("apollo-server-lambda");

// const faunadb=require('faunadb'),
//   query=faunadb.query;

// const shortId=require('shortid');
// const typeDefs = gql`
//   type Query {
//     lollies:[Lolly]
//     lollyByPath(lollyPath:String):Lolly
//   }
//   type Lolly {
//     recipient: String
//     message: String
//     sender:String
//     top:String
//     middle:String
//     bottom:String
//     lollyPath:ID!
//   }
//   type Mutation{
//     createLolly(recipient: String,message: String,sender:String,top:String,middle:String,bottom:String,lollyPath:String):Lolly
//   }
// `;

// const client=new faunadb.Client({secret:process.env.FAUNADB_SERVER_SECRET})

// const resolvers = {
//   Query: {
//     lollies: async()=>{
//       var result = await client.query(
//         query.Map(
//           query.Paginate(query.Documents(query.Collection("virtual_lolly"))),
//           query.Lambda(x => query.Get(x))
//         )
//       )
//       const lollies=result.data.map(lolly=>lolly.data);
//       console.log("result",lollies);
//       // return "result"
//       return lollies;
//     },
//     lollyByPath:async(_,{lollyPath})=>{
//       const result=await client.query(
//             query.Get(query.Match(query.Index("lolly_by_path"),lollyPath))
//           )
//           return result.data;
//     }
//   },
//   Mutation:{
//     createLolly:async (_,args)=>{
//       var id = shortId.generate();
//       console.log("Lolly",args)
//       args.lollyPath=id;
//       const result=await client.query(
//         query.Create(query.Collection("virtual_lolly"),{
//           data:args
//         })
//       )
      
//       console.log("result",result.data);

//       return result.data
//       // return args;
//     }
//   }
// };

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   playground:true,
//   introspection:true
// });

// const handler = server.createHandler();

// module.exports = { handler };









// // const { ApolloServer, gql } = require('apollo-server-lambda')

// // const faunadb = require("faunadb");
// // const q = faunadb.query;
// // const shortid = require("shortid");

// // const typeDefs = gql`
// //   type Query {
// //     hello: String
// //   }
// //   type Lolly {
// //     recipientName: String!
// //     message: String!
// //     senderName: String!
// //     flavourTop: String!
// //     flavourMiddle: String!
// //     flavourBottom: String!
// //     lollyPath: String!
// //   }
// //   type Mutation {
// //     createLolly (recipientName: String!, message: String!,senderName: String!, flavourTop: String!,flavourMiddle: String!,flavourBottom: String!) : Lolly
// //   }
// // `


// // const resolvers = {
// //   Query: {
// //     hello: () => {
// //       return 'Hello, Lolly!'
// //     },
// //   },
// //   Mutation : {
// //     createLolly: async (_, args) => {

// //         console.log("args = ",args);
      
// //       const client = new faunadb.Client({secret: "fnAEBAIUu1ACBc5HANl4ru42_RlxilA1mp9YvfSv"});
// //       const id = shortid.generate();
// //       args.lollyPath = id

// //       const result = await client.query(
// //         q.Create(q.Collection("lollies"), {
// //           data: args
// //         })
// //       );
        
// //       console.log('result', result);
// //       console.log('result', result.data);
// //       return result.data
// //     },
// //   }
// // }

// // const server = new ApolloServer({
// //   typeDefs,
// //   resolvers,
// // })

// // exports.handler = server.createHandler()