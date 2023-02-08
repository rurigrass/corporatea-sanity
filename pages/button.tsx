import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { urlFor } from '../sanity';
import { ICompany, ICompanies } from '../typings';
import { truncate } from "../utils/reusables";

interface IFormInput {
    company: string,
}

const Button = () => {
    const [searchInput, setSearchInput] = useState<string>("")
    const [selectedCompany, setCompany] = useState<ICompany>({
        _id: "0",
        image: null,
        name: "no name",
        slug: null
    })

    const companies = [
        { _id: "0", image: null, name: "no name", slug: null },
        { _id: "1", image: null, name: "no name", slug: null }
    ]

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log(data);

    }

    return (
        <div>
            {companies.map((company) =>
                <li key={company._id} className={`first:rounded-t-xl last:rounded-b-xl bg-gray-light text-blue-shady hover:bg-blue-tintish hover:text-white ${company.name.toLowerCase().startsWith(searchInput) ? "block" : "hidden"}`}>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault(), setCompany(company);
                        }}
                        className="flex items-center space-x-2 px-3 py-2 w-full" title={company.name} {...register("company")}>
                        {company.image ? (
                            <img
                                className="h-10 w-10 rounded-full mr-2"
                                src={urlFor(company.image).url()!}
                                alt="" />
                        ) : <div className="h-10 w-10 rounded-full bg-pink-tintier mr-2" />}
                        {truncate(company.name, 15)}</button>
                </li>
            )}
            <input
                type="button"
                className="h-5 w-10 bg-green-shady"
                value="Add to favorites"
            />
        </div>
    )
}

export default Button