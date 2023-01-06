// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { groq } from 'next-sanity'
import { sanityClient } from '../../sanity'
import { ISpill } from '../../typings'

const spillQuery = groq`
* [_type == "spill" && !blockSpill] {
  _id,
  spill,
  company -> {
    name,
    image
  },
  _createdAt
}  | order(_createdAt desc)
`

type Data = {
  spills: ISpill[]
}

export default async function getSpills(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const spills: ISpill[] = await sanityClient.fetch(spillQuery)
  console.log(spills);
  res.status(200).json({ spills })
}