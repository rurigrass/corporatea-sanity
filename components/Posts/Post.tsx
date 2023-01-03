import Link from "next/link"
import Image from "next/image"
import verified from "../../images/verified.png"
import { urlFor } from "../../sanity"
import { IPost } from "../../typings"


const Post = ({ post }: { post: IPost }) => {

    return (
        <div className="bg-gray-light border rounded-lg">
            <div className="rounded-t-lg overflow-hidden group">
                <Link className="cursor-pointer" key={post._id} href={`/post/${post.slug.current}`}>
                    <div className="relative ">
                        <h2 className="text-white text-4xl max-w-xl font-poppins font-bold absolute top-3.5 left-4 right-14 z-10">{post.title}</h2>
                        <Image className="absolute w-10 top-3.5 right-3.5 z-10" src={verified} alt="cup" priority={true} />
                        {post.mainImage ? (
                            <img className="group-hover:scale-105 transition-transform duration-200 ease-in-out h-60 w-full object-cover"
                                src={urlFor(post.mainImage).url()!}
                                alt="" />
                        ) : <div className="h-60 " />}
                    </div>
                </Link>
            </div>
            <div className="flex justify-between p-2">
                <div className="bg-white p-2 rounded-lg">
                    <p className="underline decoration-white decoration-3 hover: cursor-pointer hover:text-green-green hover:decoration-green">
                        #{post.company.name}
                    </p>
                </div>
                <div className="flex space-x-2">
                    <div className="flex bg-white p-2 space-x-1.5 rounded-lg cursor-pointer">
                        <div>10</div>
                        <div>💬</div>
                    </div>
                    <div className="flex bg-white p-2 space-x-1.5 rounded-lg cursor-pointer">
                        <div>+</div>
                        <div>🌶</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post