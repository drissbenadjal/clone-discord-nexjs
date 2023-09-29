// import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import QRCode from "react-qr-code";
import { useEffect, useState, useContext } from "react";
import { LoadingContext } from "@/context/LoadingContext";

import bgDiscord from '../assets/icons/bg.svg';

const Login = () => {
    const { setLoading } = useContext(LoadingContext);
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [])

    const HandleSubmit = (e) => {
        e.preventDefault();
        const { username } = e.target.elements;
        if (!username.value || username.value === "" || username.value === " " || username.value === null) return;
        localStorage.setItem("username", username.value);
        e.target.reset();
        router.push("/");
    }

    const [value, setValue] = useState("")

    useEffect(() => {
        setValue("https://discord.gg/2uY6QqX")
    }, [value])

    return (
        <>
            <Image src={bgDiscord} alt="background" className="bg-discord" />
            <div className="login-form">
                <div className='login-form__left'>
                    <h1>Welcome back!</h1>
                    <p>
                        We re so excited to see you again!
                    </p>
                    <form onSubmit={(e) => HandleSubmit(e)} >
                        <div className='form_group'>
                            <label htmlFor="username">
                                Username <span>*</span>
                            </label>
                            <input type="text" id="username" name="username" />
                        </div>
                        <button type="submit">Log In</button>
                    </form>
                </div>
                <div className='login-form__right'>
                    <div className='qr-code'>
                        <QRCode
                            size={256}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={value}
                            viewBox={`0 0 256 256`}
                        />
                    </div>
                    <div className='qr-code__text'>
                        <h1>
                            Log in with QR Code
                        </h1>
                        <p><span>Scan</span> this <span>QR code</span> with your <br /> <span>phone</span> to login</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;