import { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../sanity";
import { ISpillComment } from "../../typings";

const spillCommentQuery = groq`
* [_type == "spillComment" && !blockComment  && references(*[_type == 'spill' && _id == $spillId]._id)] {
  _id,
  ...
} | order(_createdAt desc)
`

type Data = {
  spillComments: ISpillComment[]
}

export default async function getSpillComments(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { spillId } = req.query
  const spillComments: ISpillComment[] = await sanityClient.fetch(spillCommentQuery, { spillId })
  console.log(spillComments);
  res.status(200).json({ spillComments })
}