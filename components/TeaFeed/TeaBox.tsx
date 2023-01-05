import { useState } from "react";
import { urlFor } from "../../sanity";
import { ICompanies, ICompany } from "../../typings";
import Image from "next/image";
import cup from "../../images/cup.png";

const TeaBox = ({ companies }: ICompanies) => {
    const [input, setInput] = useState<string>("")
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [selectedCompany, setCompany] = useState<ICompany>({
        _id: "0",
        image: null,
        name: "no name",
        slug: { _type: "string", current: "string" }
    })


    return (
        <div className="bg-white rounded-xl m-2 md:mx-6 p-2 grid grid-cols-teabox gap-4">
            <div className="grid grid-rows-2 gap-2 w-14">
                <Image className="h-14 w-14 rounded-full" src={cup} alt="cup" priority={true} />
                {selectedCompany.image === null || null ?
                    <div className="h-14 w-14 rounded-md object-cover bg-pink-tintier" />
                    :
                    <img className="h-14 w-14 rounded-md object-cover" src={urlFor(selectedCompany.image).url()!} />
                }
            </div>
            <form className="grid grid-rows-teabox gap-2" action="" >
                {/* <div> */}
                <textarea className="p-2 border-none resize-none" placeholder="What's the tea?" value={input} onChange={e => setInput(e.target.value)} />
                {/* </div> */}
                <div className="flex justify-end space-x-2">
                    <div className="relative">
                        <button className="block" onClick={(e) => { e.preventDefault(), setDropdownOpen(!dropdownOpen) }}>
                            <div className="bg-gray-gray text-white px-3 py-2 rounded-xl">select company</div>
                        </button>
                        {dropdownOpen &&
                            <>
                                <button onClick={(e) => { e.preventDefault(), setDropdownOpen(false) }} className="fixed w-full h-full bg-blue-shady opacity-50 inset-0 z-20 cursor-default"></button>
                                <ul className="absolute mt-1 right-0 z-20 bg-white rounded-xl overflow-auto h-48">
                                    <a href="#" className="flex static px-3 py-2 border-b-blue-normal border-b-2">Add new company</a>
                                    {companies.map(company =>
                                        <li key={company._id} className="first:rounded-t-xl last:rounded-b-xl bg-gray-light text-blue-shady hover:bg-blue-tintish hover:text-white">
                                            <button onClick={(e) => {
                                                e.preventDefault(), setCompany(company);
                                            }} className="flex items-center space-x-2 px-3 py-2" title={company.name}>
                                                {company.image ? (
                                                    <img
                                                        className="h-10 w-10 rounded-full mr-2"
                                                        src={urlFor(company.image).url()!}
                                                        alt="" />
                                                ) : <div className="h-10 w-10 rounded-full bg-pink-tintier mr-2" />}
                                                {company.name.length > 15 ?
                                                    (company.name).substring(0, 15) + "..." :
                                                    company.name}</button>
                                        </li>
                                    )}
                                </ul>
                            </>
                        }
                    </div>
                    {/* <a href="#" className="flex items-center py-2 px-4 hover:bg-gray-gray dark:hover:bg-gray-600 dark:hover:text-white">
                            <img className="h-14 w-14 mt-4 rounded-full object-cover cursor-pointer" src="https://links.papareact.com/gll" alt="Jese image" />
                            Bonnie Green
                        </a> */}
                    <button className="bg-green-green text-white px-3 py-2 rounded-xl disabled:opacity-75" disabled={!input}>spill</button>
                </div>
            </form>
        </div>

    )
}

export default TeaBox