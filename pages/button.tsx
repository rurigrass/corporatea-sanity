import { useState } from 'react';
import { useForm, SubmitHandler, useController } from 'react-hook-form';
import { ICompany, ICompanies } from '../typings';

interface IFormInput {
    company: ICompany,
}

const Button = () => {
    const [selectedCompany, setCompany] = useState<ICompany>({
        _id: "0",
        image: null,
        name: "poopp name",
        slug: null
    })

    // console.log("SELECTED COMPANY ", selectedCompany.name);


    const companies = [
        { _id: "0", image: null, name: "nope name", slug: null },
        { _id: "1", image: null, name: "poo name", slug: null }
    ]

    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<IFormInput>();

    const { field } = useController({ name: "company", control })

    const handleSelectChange = (company: ICompany) => {
        field.onChange(company.name)
        setCompany(company)
    }

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
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
                            onClick={(e) => {
                                e.preventDefault(),
                                    handleSelectChange(company)
                            }}
                            className="flex items-center space-x-2 px-3 py-2 w-full hover:cursor-pointer"
                            value={company.name} />
                    </li>
                )}
                <input
                    type="submit"
                    className="h-10 w-40 bg-green-shady hover:cursor-pointer"
                    value="Add to favorites"
                />
            </form>
        </div>
    )
}

export default Button