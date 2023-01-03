export interface IPost {
  _id: string
  title: string
  company: { name: string }
  author: { name: string, image: string }
  slug: { _type: string, current: string }
  mainImage: { asset: { url: string } }
  body: [object]
  verified: boolean
  _createdAt: string
  comments: IComment[]
}

export interface IComment {
  approved: boolean,
  comment: string,
  post: {
    _ref: string,
    _type: string
  },
  _createdAt: string,
  _id: string,
  _rev: string,
  _type: string,
  _updatedAt: string
}

export interface ICompany {
  _id: string
  image: { asset: { url: string } } | null
  name: string
  slug: { _type: string, current: string }
}

//ARRAY TYPINGS 

interface IPosts {
  posts: IPost[]
};

interface ICompanies {
  companies: ICompany[]
}