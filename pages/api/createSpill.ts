// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '@sanity/client'


import { ISpill } from '../../typings'

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN
}

const client = sanityClient(config)

export default async function createSpill(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id, spill } = JSON.parse(req.body);
  try {
    await client.create({
      _type: "spill",
      spill: spill.spill,
      author: spill.author,
      blockSpill: false,
      company: {
        _type: "reference",
        _ref: _id
      },
      verified: spill.verified
    })
  } catch (err) {
    return res.status(500).json({ message: `Couldn't submit content`, err })
  }

  console.log("Comment submitted");
  return res.status(200).json({ name: 'Spill Submitted' })
}
