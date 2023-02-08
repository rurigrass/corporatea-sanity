import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { urlFor } from '../sanity';
import { ICompany, ICompanies } from '../typings';
import { truncate } from "../utils/reusables";

interface IFormInput {
    company: string,
}

const Button = () => {
    const [selectedCompany, setCompany] = useState<ICompany>({
        _id: "0",
        image: null,
        name: "poopp name",
        slug: null
    })

    // console.log("SELECTED COMPANY ", selectedCompany);


    const companies = [
        { _id: "0", image: null, name: "no name", slug: null },
        { _id: "1", image: null, name: "poo name", slug: null }
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
            <form onSubmit={handleSubmit(onSubmit)}>
                {companies.map((company) =>
                    <li key={company._id} className={`first:rounded-t-xl last:rounded-b-xl bg-gray-light text-blue-shady hover:bg-blue-tintish hover:text-white ${company.name.toLowerCase() ? "block" : "hidden"}`}>
                        <input
                            type="button"
                            title={company.name}
                            {...register("company")}
                            onClick={(e) => {
                                e.preventDefault(), setCompany(company)
                            }}
                            className="flex items-center space-x-2 px-3 py-2 w-full hover:cursor-pointer"
                            value={selectedCompany.name} />
                        {company.name}
                    </li>
                )}
                <input
                    type="submit"
                    className="h-5 w-10 bg-green-shady"
                    value="Add to favorites"
                />
            </form>
        </div>
    )
}

export default Button