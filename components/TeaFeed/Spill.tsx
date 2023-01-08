import { urlFor } from "../../sanity";
import { ISpill, ISpillComment } from "../../typings";
import TimeAgo from 'react-timeago';
import { fetchSpillComments } from "../../utils/fetchSpillComments";
import { useEffect, useState } from "react";



const Spill = ({ spill }: { spill: ISpill }) => {
    const [spillComments, setSpillComments] = useState<ISpillComment[]>([])

    const refreshSpillComments = async () => {
        const spillComments: ISpillComment[] = await fetchSpillComments(spill._id);
        setSpillComments(spillComments)
    }

    useEffect(() => {
        refreshSpillComments()
    }, [])

    console.log(spillComments);


    return (
        <div className="m-2 md:mx-6">
            <div className={`bg-white ${spillComments.length > 0 ? "rounded-t-xl" : "rounded-xl"}`}>
                <div className="text-right pr-4 pt-2 text-gray-gray text-xs">
                    <TimeAgo date={spill._createdAt} />
                </div>
                <div className="px-4 text-xl text-gray-gray font-semibold md:text-2xl">
                    {spill.spill}
                </div>
                <div className="flex justify-between pt-2 pb-3 pr-4 pl-3.5">
                    <div className="hover:cursor-pointer" title={spill.company.name}>
                        {spill.company.image ?
                            <img className="rounded-md h-10 w-10 border-2 border-gray-light" src={urlFor(spill.company.image).url()!} alt="" /> :
                            <div className="bg-blue-light p-2 rounded-lg hover:text-green-green hover:decoration-green-green underline decoration-blue-light decoration-3 ">
                                #{spill.company.name}
                            </div>
                        }
                    </div>
                    <div className="flex space-x-2">
                        <div className="flex bg-blue-light p-2 space-x-1.5 rounded-lg cursor-pointer">
                            <div>10</div>
                            <div>💬</div>
                        </div>
                        <div className="flex bg-blue-light p-2 space-x-1.5 rounded-lg cursor-pointer">
                            <div>+</div>
                            <div>🌶</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-light rounded-b-xl">
                {spillComments.map(spillComment =>

                    // <div className="even:bg-white relative">
                    //     <div className="text-gray-gray text-[10px] absolute right-4 top-1">
                    //         <TimeAgo date={spillComment._createdAt} />
                    //     </div>
                    //     <div className="flex items-center px-3 py-2 ">
                    //         <div className="bg-gray-grayer h-10 w-10 rounded-full "></div>
                    //         <div className="px-2 text-gray-gray">
                    //             {spillComment.comment}
                    //         </div>
                    //     </div>
                    // </div>
                    <div className="even:bg-white grid grid-cols-teabox p-2 pl-3.5">
                        <div className="bg-gray-grayer h-10 w-10 rounded-full" />
                        <div className="relative">
                            <TimeAgo className="text-gray-gray text-[9px] absolute right-2 -top-1" date={spillComment._createdAt} />
                            <div className="p-2 pl-3">
                                {spillComment.comment}
                            </div>
                        </div>
                    </div>

                )}
            </div>
        </div>
    )
}

// const getServerSideProps = async () => {
//     // console.log(spill);

//     // const spillId = spill._id
//     // const spillComments = await fetchSpillComments(spillId)
// }

export default Spill