const path = require(`path`)
var faunadb = require("faunadb"),
  q = faunadb.query

var client = new faunadb.Client({
  secret: "fnAEBAIUu1ACBc5HANl4ru42_RlxilA1mp9YvfSv",
})

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  const lollyTemplate = path.resolve(`src/templates/lolly.tsx`)

  createRedirect({
    fromPath: "/lolly/*",
    toPath: "/.netlify/functions/showLolly?id=:splat",
    isPermanent: false
  })

  try {
    const result = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index("all_lollies"))),
        q.Lambda(x => q.Get(x))
      )
    )
    console.log(result)
    return result.data.map(d =>
      createPage({
        path: `lolly/${d.data.link}`,
        component: lollyTemplate,
        context: {
          link: d.data.link,
        },
      })
    )
  } catch (error) {
    console.log(error)
  }
}








// const path = require("path")
// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions

//   const { data } = await graphql(`
//        {
//         get_v_Card {
//             getVCard { 
//               c1
//                c2
//                c3
//                rec
//                msg
//                sender
//                url
//             }
//           }
//         }
//   `)

//   data.get_v_Card.getVCard.forEach(node => {
//     createPage({
//       path: `lolly/${node.url}`,
//       component: path.resolve("./src/templates/template.js"),
//       context: {
//         id: node.url,
//         c1: node.c1,
//         c2: node.c2,
//         c3: node.c3,
//         url: node.url,
//         msg: node.msg,
//         sender: node.sender,
//         rec: node.rec
//       },
//     })
//   })
// }