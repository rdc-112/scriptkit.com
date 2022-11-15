// Next.js API route to check if user is a sponsor
import {gql, GraphQLClient} from 'graphql-request'
import {NextApiRequest, NextApiResponse} from 'next'
import {createClient, SupabaseClient} from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_API_KEY as string,
)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let endpoint = 'https://api.github.com/graphql'

  let {id, login, node_id, twitter_username, email, name, feature} = req.body

  let supabaseResponse = await supabase.from('users').insert([
    {
      database_id: id,
      login,
      node_id,
      twitter_username,
      email,
      name,
      feature,
    },
  ])

  if (supabaseResponse.error) {
    res.status(500).json({error: supabaseResponse.error})
  }

  let client = new GraphQLClient(endpoint, {
    headers: {
      'GraphQL-Features': 'discussions_api',
      authorization: `Bearer ${process.env.GITHUB_DISCUSSIONS_TOKEN}`,
    },
  })

  let query = gql`
    query {
      user(login: "johnlindquist") {
        sponsorshipsAsMaintainer(first: 100) {
          nodes {
            sponsorEntity {
              __typename
              ... on User {
                id
                databaseId
                login
              }
            }
          }
        }
      }
    }
  `

  let response = await client.request(query)
  if (response.error) {
    res.status(500).json({error: response.error})
  }

  let sponsors = response.user.sponsorshipsAsMaintainer.nodes.map(
    (n: any) => n.sponsorEntity,
  )

  let isSponsor = sponsors.find((s: any) => {
    return s.id === node_id && s.login === login && s.databaseId === id
  })

  res.send(isSponsor)
}