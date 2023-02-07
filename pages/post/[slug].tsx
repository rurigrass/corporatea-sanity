import { GetStaticProps } from "next"
import { sanityClient, urlFor } from "../../sanity"
import { IPost } from "../../typings"
import Header from "../../components/Header"
import PortableText from "react-portable-text"
import { useForm, SubmitHandler } from "react-hook-form"
import { useState } from "react"

interface IFormInput {
    _id: string,
    name?: string,
    comment: string,
}

const Post = ({ post }: { post: IPost }) => {
    const [submitted, setSubmitted] = useState(false);
    console.log(post);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        await fetch('/api/createComment', {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(() => {
            console.log(data);
            setSubmitted(true);
        }).catch((err) => {
            console.log(err);
            setSubmitted(false);
        })
    }

    return (
        <main className="max-w-7xl mx-auto">
            <Header />
            <div >
                {post.mainImage ? (
                    <img
                        className="w-full h-80 object-cover"
                        src={urlFor(post.mainImage).url()!}
                        alt="" />
                ) : <div className="bg-pink-tintier h-20" />}
            </div>
            <article className="max-w-3xl mx-auto p-5">
                <h1 className="text-4xl mt-3 mb-3 font-bold">{post.title}</h1>
                {/* check if author is anonymous */}

                <div className="mt-10">
                    <PortableText
                        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                        content={post.body}
                        serializers={
                            {
                                h1: (props: any) => (
                                    <h1 className="text-2xl font-bold my-5" {...props} />
                                ),
                                h2: (props: any) => (
                                    <h1 className="text-xl font-bold my-5" {...props} />
                                ),
                                h3: (props: any) => (
                                    <h1 className="text-lg font-bold my-5" {...props} />
                                ),
                                li: ({ children }: any) => (
                                    <li className="ml-4 list-disc">
                                        {children}
                                    </li>
                                ),
                                link: ({ href, children }: any) => (
                                    <a className="underline hover:text-green-green hover:decoration-green">
                                        {children}
                                    </a>
                                )
                            }
                        }
                    />
                </div>
                <div className="flex items-center space-x-2 mt-5 mb-3">
                    <img
                        className="h-10 w-10 rounded-full"
                        src={urlFor(post.author.image).url()!}
                        alt="" />
                    <p>
                        Tea spilled by <span className="underline decoration-black decoration-3 hover: cursor-pointer hover:text-green-green hover:decoration-green">{post.author.name}</span> on {new Date(post._createdAt).toLocaleDateString()}
                    </p>
                </div>
            </article>
            <hr className="max-w-5xl my-5 mx-auto border border-pink-tintier" />

            <div className="flex flex-col p-5 my-10 mb-10 max-w-2xl mx-auto">
                {submitted ? (
                    <div className="bg-pink-tintier text-white p-10 mb-5 shadow-pink-tintier shadow">
                        <h3 className="text-3xl font-bold">Thanks for submitting</h3>
                        <p>Once approved it will appear below</p>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col mb-10 max-w-2xl "
                    >
                        <h3 className="text-sm text-pink-tintier">More to spout about?</h3>
                        <h4 className="text-2xl font-bold">Leave a comment below</h4>
                        <hr className="py-3 mt-2" />

                        <input
                            {...register("_id")}
                            type="hidden"
                            name="_id"
                            value={post._id}
                        />

                        <label className="block">
                            <span className="text-gray-gray">Comment</span>
                            <textarea
                                {...register("comment", { required: true })}
                                className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring ring-pink-tintier outline-blue-tintish" placeholder="Add some sugar" rows={4} />
                        </label>

                        {/* Errors will return when field validation fails */}
                        <div className="flex flex-col p-2">
                            {errors.comment && (
                                <span className="text-red">
                                    - The comment field is required
                                </span>
                            )}
                        </div>

                        <input type="submit" className="shadow bg-green-green hover:bg-green-shady cursor-pointer focus:shadow-outline focus:outline-none text-white font-bold py-2 px-2 rounded" />
                    </form>

                )}
                <div className="flex flex-col shadow-pink-tintier p-10 shadow space-y-2 overflow-hidden" >
                    <h4 className="text-3xl font-bold">Comments</h4>
                    <hr className="mt-2 border border-pink-tintier" />
                    {post.comments.map((comment) =>
                        <p key={comment._id}><span className="text-pink-tintish">Anonymous:</span> {comment.comment}</p>
                    )}
                </div>
            </div>

        </main>
    )
}

export default Post

export const getStaticPaths = async () => {
    const query = ` 
        * [_type == "post"] {
            _id,
            slug {
                current
            },
        }
        `

    const posts = await sanityClient.fetch(query);

    const paths = posts.map((post: IPost) => ({
        params: {
            slug: post.slug.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const query = `
        * [_type == "post" && slug.current == $slug][0] {
        _id,
        _createdAt,
        title,
        verified,
        mainImage,
        slug,
        company -> {
            name
        },
        author -> {
            name,
            image
        },
        body,
        'comments': *[
            _type == "comment" &&
            post._ref == ^._id &&
            approved == true
        ],
        }
    `

    const post = await sanityClient.fetch(query, {
        slug: params?.slug
    })

    if (!post) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            post,
        },
        revalidate: 60, //after 60 seconds it will update the old cached version.
    }

}
