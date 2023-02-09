import { useState } from "react";
import { urlFor } from "../../sanity";
import { ICompanies, ICompany } from "../../typings";
import Image from "next/image";
import cup from "../../images/cup.png";
import { truncate } from "../../utils/reusables";
import { useForm, SubmitHandler, useController } from 'react-hook-form';
import { log } from "console";

interface IFormInput {
    company: ICompany,
    spill: string,
}

const TeaBox = ({ companies }: ICompanies) => {
    const [input, setInput] = useState<string>("")
    const [submitted, setSubmitted] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [searchInput, setSearchInput] = useState<string>("")
    const [selectedCompany, setCompany] = useState<ICompany>({
        _id: "0",
        image: null,
        name: "no name",
        slug: { _type: "string", current: "string" }
    })

    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<IFormInput>();

    const { field } = useController({ name: "company", control })

    const handleDropdownChange = (company: ICompany) => {
        field.onChange(company)
        setCompany(company)
    }

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log(data)
        // await fetch('/api/createSpill', {
        //     method: 'POST',
        //     body: JSON.stringify(data)
        // }).then(() => {
        //     console.log(data);
        //     setSubmitted(true);
        // }).catch((err) => {
        //     console.log(err);
        //     setSubmitted(false);
        // })
    }

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
            <form className="grid grid-rows-teabox gap-2" action="" onSubmit={handleSubmit(onSubmit)}>
                {/* <div> */}
                <textarea
                    {...register("spill", { required: true })}
                    className="p-2 border-none resize-none text-xl md:text-2xl text-gray-gray font-semibold outline-none"
                    placeholder="What's the tea?"
                    value={input}
                    onChange={e => setInput(e.target.value)} />
                {/* </div> */}
                <div className="flex justify-end space-x-2">
                    <div className="relative">
                        <button className="block" onClick={(e) => { e.preventDefault(), setDropdownOpen(!dropdownOpen) }}>
                            <div className="bg-gray-gray text-white px-3 py-2 rounded-xl">select company</div>
                        </button>
                        {dropdownOpen &&
                            <>
                                <button onClick={(e) => { e.preventDefault(), setDropdownOpen(false) }} className="fixed w-full h-full bg-blue-shady opacity-50 inset-0 z-20 cursor-default"></button>
                                <ul className="absolute mt-1 right-0 z-20 bg-white rounded-xl overflow-auto max-h-52 w-60">
                                    <div className="flex items-center top-0 sticky">
                                        <input type="text" placeholder="Search company" className="px-3 py-2 outline-none w-full text-gray-gray border-b-2 border-b-blue-normal" value={searchInput} onChange={(e) => { setSearchInput(e.target.value.toLowerCase()) }} />
                                    </div>
                                    {companies.map(company =>
                                        <li key={company._id} className={`first:rounded-t-xl last:rounded-b-xl bg-gray-light text-blue-shady hover:bg-blue-tintish hover:text-white ${company.name.toLowerCase().startsWith(searchInput) ? "block" : "hidden"}`}>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault(),
                                                        handleDropdownChange(company)
                                                }}
                                                className="flex items-center space-x-2 px-3 py-2 w-full" title={company.name}>
                                                {company.image ? (
                                                    <img
                                                        className="h-10 w-10 rounded-full mr-2"
                                                        src={urlFor(company.image).url()!}
                                                        alt="" />
                                                ) : <div className="h-10 w-10 rounded-full bg-pink-tintier mr-2" />}
                                                {truncate(company.name, 15)}</button>
                                        </li>
                                    )}
                                    <a href="#" className="flex items-center bottom-0 sticky bg-white text-gray-gray px-3 py-2 w-full hover:bg-blue-normal hover:text-white">Add new company</a>
                                </ul>
                            </>
                        }
                    </div>
                    <input
                        {...register("company", { required: true })}
                        type="hidden"
                        // name="_id"
                        value={selectedCompany.name}
                    />
                    <button type="submit" className="bg-green-green text-white px-3 py-2 rounded-xl disabled:opacity-70" disabled={!input || selectedCompany._id === "0"}>spill</button>
                </div>
            </form>
        </div>

    )
}

export default TeaBox