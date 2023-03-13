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
  const { spill, company } = JSON.parse(req.body);

  console.log("OMG a log: ", spill, company);

  try {
    await client.create({
      _type: "spill",
      spill,
      // author: spill.author,
      blockSpill: false,
      company: {
        _type: "reference",
        _ref: company._id
      },
      verified: false
    })
  } catch (err) {
    return res.status(500).json({ message: `Couldn't submit spill `, err })
  }

  console.log("Spill submitted");
  return res.status(200).json({ name: 'Spill Submitted' })
}
