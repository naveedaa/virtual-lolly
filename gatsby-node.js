
const path = require("path")
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const { data } = await graphql(`
       {
        get_v_Card {
            getVCard { 
              c1
               c2
               c3
               rec
               msg
               sender
               url
            }
          }
        }
  `)

  data.get_v_Card.getVCard.forEach(node => {
    createPage({
      path: `lolly/${node.url}`,
      component: path.resolve("./src/templates/template.js"),
      context: {
        id: node.url,
        c1: node.c1,
        c2: node.c2,
        c3: node.c3,
        url: node.url,
        msg: node.msg,
        sender: node.sender,
        rec: node.rec
      },
    })
  })
}