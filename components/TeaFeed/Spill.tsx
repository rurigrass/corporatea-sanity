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
            <div className="bg-white rounded-xl ">
                <div className="text-right pr-2 pt-2 text-gray-gray text-xs">
                    <TimeAgo date={spill._createdAt} />
                </div>
                <div className="px-4 text-lg">
                    {spill.spill}
                </div>
                <div className="flex justify-between p-2">
                    <div className="hover:cursor-pointer " title={spill.company.name}>
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
            <div className="bg-gray-light rounded-xl ">
                {spillComments.map(spillComment => <div>
                    {spillComment.comment}
                </div>)}
            </div>
        </div>
    )
}

const getServerSideProps = async () => {
    console.log(spill);

    // const spillId = spill._id
    // const spillComments = await fetchSpillComments(spillId)
}

export default Spill