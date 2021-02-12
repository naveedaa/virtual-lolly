import React from 'react'
import { gql, useQuery } from '@apollo/client'
import Loader from 'react-loader-spinner'

const getLollyById  = gql`
query getLolly($id: String!) {
      getLolly(id: $id) {
        lollyPath
        recipientName
        message
        senderName
        flavourTop
        flavourMiddle
        flavourBottom
    }
  }
`

const Page404 =  ({ location }) => {
    const pathId =  location.pathname.slice(8)
    const { loading, error, data } = useQuery(getLollyById, {
        variables: {
            id: pathId
        }
    })

    if(loading) {
        return <Loader type='Puff' color="#cbd5e0" />
    }



    return (
        <div>
            <h1>Error...</h1>
        </div>
    )
}

export default Page404