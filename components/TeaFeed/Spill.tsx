import { ISpill } from "../../typings";

const Spill = ({ spill }: { spill: ISpill }) => {
    console.log(spill);

    return (
        <div className="bg-white rounded-xl m-2 md:mx-6">
            <div className="px-4 pt-2">
                {spill.spill}
            </div>
            <div className="flex justify-between p-2">
                <div className="bg-blue-light p-2 rounded-lg hover:cursor-pointer hover:text-green-green hover:decoration-green-green">
                    <p className="underline decoration-blue-light decoration-3 ">
                        #{spill.company.name}
                    </p>
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
    )
}

export default Spill