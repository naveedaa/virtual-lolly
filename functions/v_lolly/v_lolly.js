const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require('faunadb'),
  q = faunadb.query;
require('dotenv').config();
const shortid = require("shortid")
const axios = require("axios")

const typeDefs = gql`
  type Query {
    getVCard: [VCard!]
    getLollyByPath(url: String!): VCard 
  }
  type VCard {
    id: ID!
    c1:String!
    c2:String!
    c3:String!
    sender:String!
    rec:String!
    msg:String!
    url:String!
  }
  type Mutation {
    addVCard(c1:String!  
      c2:String!
      c3:String!
      sender:String!
      rec:String!
      msg:String!
      url:String!
    ) : VCard
  }
`

const resolvers = {
  Query: {
    getVCard: async (parent, root, args) => {
      try {
        var adminClient = new faunadb.Client({ secret: process.env.FAUNADB_ADMIN_SECRET });
        const result = await adminClient.query(
          q.Map(
            q.Paginate(q.Match(q.Index('lollies'))),
            q.Lambda(x => q.Get(x))
          )
        )
        console.log(result.data)

        return result.data.map(d => {
          return {
            id: d.ref.ts,
            rec: d.data.rec,
            msg: d.data.msg,
            sender: d.data.sender,
            url: d.data.url,
            c1: d.data.c1,
            c2: d.data.c2,
            c3: d.data.c3,
          }
        })
      }
      catch (err) {
        console.log("err", err)
      }
    },
    getLollyByPath: async (_, args) => {
      try {
        var adminClient = new faunadb.Client({ secret: process.env.FAUNADB_ADMIN_SECRET });
        const result = await adminClient.query(
          q.Get(q.Match(q.Index("lollies"), args.url))
        )
        result.data
      }
      catch (err) {
        console.log("err", err)
      }
    }

  },

  Mutation: {
    addVCard: async (_, { c1, c2, c3, rec, msg, sender, url }) => {
      console.log(c1, c2, c3, rec, msg, sender, url)

      try {
        var client = new faunadb.Client({ secret: process.env.FAUNADB_ADMIN_SECRET });
        var result = await client.query(
          q.Create(
            q.Collection('v_lolly'),
            {
              data: {
                c1, c2, c3, rec, msg, sender, url
              }
            },
          )
        );
        axios
          .post("https://api.netlify.com/build_hooks/5fb41c3cbf9b3100bb60bee4")
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.error(error)
          })
        return result.ref.data

      }
      catch (err) {
        console.log("err", err)
      }
    }

  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()