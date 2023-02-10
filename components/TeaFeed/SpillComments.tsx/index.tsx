import { ISpillComment } from "../../../typings"
import TimeAgo from 'react-timeago';


const SpillComments = ({ spillComments }: { spillComments: ISpillComment[] }) => {
    return (
        <div>
            <div className={`bg-white h-14 pl-3.5 ${spillComments.length <= 0 && "rounded-b-xl"}`}>this is the spill comments box</div>
            <div className="bg-gray-light rounded-b-xl">
                {spillComments.map(spillComment =>
                    <div key={spillComment._id} className="even:bg-white grid grid-cols-teabox p-2 pl-3.5">
                        <div className="bg-gray-grayer h-10 w-10 rounded-full" />
                        <div className="relative">
                            <TimeAgo className="absolute text-gray-gray text-[9px] right-2 -top-1" date={spillComment._createdAt} />
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