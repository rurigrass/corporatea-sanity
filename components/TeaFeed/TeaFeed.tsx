import { ISpills } from "../../typings"
import Spill from "./Spill";

const TeaFeed = ({ spills }: ISpills) => {
    // console.log(spills);

    // spills.map(spill => console.log(spill))


    return (
        <div>
            {spills.map(spill => <Spill key={spill._id} spill={spill} />)}
        </div>
    )
}

export default TeaFeed