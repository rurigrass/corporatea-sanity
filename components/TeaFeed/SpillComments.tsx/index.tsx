import { ISpillComment } from "../../../typings"
import TimeAgo from 'react-timeago';


const SpillComments = ({ spillComments }: { spillComments: ISpillComment[] }) => {
    return (
        <div>
            <div>this is the spill comments box</div>
            <div className="bg-gray-light rounded-b-xl">
                {spillComments.map(spillComment =>
                    <div key={spillComment._id} className="even:bg-white grid grid-cols-teabox p-2 pl-3.5">
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

export default SpillComments