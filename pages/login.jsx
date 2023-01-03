import { GoogleLogin } from "react-google-login";
import Image from "next/image"
import google from "../images/google.png"

const clientId = "44129762998-mieiucap9cd34ohu82rkgrhv6983k3gd.apps.googleusercontent.com"

const Login = () => {

    const onSuccess = (res) => {
        console.log("great success", res);
    }

    const onFailure = (res) => {
        console.log("fail", res);
    }

    const responseGoogle = (response) => {
        console.log(response);
    }

    return (
        <div className="flex justify-center items-center flex-col h-screen bg-pink-tintier">
            <div className="flex shadow-2xl">
                <GoogleLogin
                    clientId={clientId}
                    
                    render={(renderProps) => (
                        <button
                            type="button"
                            className="bg-gray-light flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none space-x-2"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                        >
                            <Image src={google} alt="G" />
                            <p>Sign in with Google</p>
                        </button>
                    )}
                    // onSuccess={responseGoogle}
                    // onFailure={responseGoogle}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy="single_host_origin"
                    isSignedIn={true}
                />
            </div>
        </div>
    )
}

export default Login