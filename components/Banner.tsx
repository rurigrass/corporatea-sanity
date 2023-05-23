import cup from "../images/cup.png";
import Image from "next/image";

const Banner = () => {
    return (
        <>
            <div className="flex items-center bg-pink-tintier px-10 py-10">
                <div className="lg:w-1/3 w-1/2 flex justify-center">
                    <h1 className=" text-white text-6xl max-w-xl font-montserrat font-bold">Spill the tea</h1>
                </div>
                <div className="lg:w-1/3 w-1/2 flex justify-center">
                    <Image src={cup} alt="cupOfTea" priority={true} />
                </div>
                <div className="hidden lg:w-1/3 lg:flex lg:justify-center">
                    <h2 className="  text-white text-4xl font-montserrat font-semibold">on your <span className="underline decoration-white decoration-3 hover: cursor-pointer hover:text-green-green hover:decoration-green">company</span></h2>
                </div>
            </div>
            <div className="lg:hidden bg-blue-tintish  py-5 text-center">
                <h2 className="text-white text-3xl sm:text-4xl font-montserrat font-semibold">on your <span className="underline xdecoration-3 hover:cursor-pointer hover:text-green-green hover:decoration-green-green">company</span></h2>
            </div>
        </>
    )
}

export default Banner
