import Link from "next/link"

const Header = () => {
    return (
        <header className="flex justify-between px-5 py-2 bg-white sticky top-0">
            <div className="flex items-center space-x-5 ">
                <Link href="/">
                    <img className="w-44 object-contain cursor-pointer" src="https://links.papareact.com/yvf" alt="" />
                </Link>
                <div className='hidden md:inline-flex items-center space-x-5'>
                    <h3>About</h3>
                    <h3>Contact</h3>
                </div>
            </div>
            <div className="flex items-center space-x-5 text-green-green">
                <h3>Sign In</h3>
                <h3 className="text-white bg-green-green px-4 py-1 rounded-full">Post</h3>
            </div>
        </header>
    )
}

export default Header