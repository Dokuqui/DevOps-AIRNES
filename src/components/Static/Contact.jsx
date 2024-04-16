import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import Footer from "./Footer";
import Header from "./Header";
import { useState } from "react";
import "../../styles/contact.scss"


const ContactPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [disabled, setDisabled] = useState(false);

    const onSubmit = async (data) => {
        try {
            setDisabled(true);
            await emailjs.send(
                process.env.REACT_APP_SERVICE_ID,
                process.env.REACT_APP_TEMPLATE_ID,
                data,
                process.env.REACT_APP_PUBLIC_KEY
            );
            alert("Email was sended successfully! You can check your inbox or spam.");
            reset();
        } catch (error) {
            console.log("Error: ", error);
            alert("An error ocurred, please try again later!")
        } finally {
            setDisabled(false);
        }
    }
    return (
        <div>
            <Header />
            <h2>
                Contact Us
            </h2>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
                    <input type="text" {...register('name',
                        {
                            required: 'Name is required'
                        })} placeholder="Your Name" />
                    {errors.name && <p>{errors.name.message}</p>}

                    <input type="text" {...register('email',
                        {
                            required: 'Email is required', pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Please enter a valid email address. Example: example@example.com'
                            }
                        })} placeholder="Email" />
                    {errors.email && <p>{errors.email.message}</p>}

                    <input type="text" {...register('subject',
                        {
                            required: 'Subject is required'
                        })} placeholder="Subject" />
                    {errors.subject && <p>{errors.subject.message}</p>}

                    <textarea type="text" {...register('message',
                        {
                            required: 'Message is required'
                        })} placeholder="Text Area" />
                    {errors.message && <p>{errors.message.message}</p>}

                    <button type="submit" disabled={disabled}>
                        Submit
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default ContactPage;