import React, {useRef} from 'react';
import {Button, Input, Textarea} from "@nextui-org/react";
import {useFormik} from "formik";
import {EmailSenderType} from "../types/emailSenderTypes.ts";
import emailjs from '@emailjs/browser';

const EmailSender = () => {
    const form = useRef<HTMLFormElement>(null);

    const initialValues: EmailSenderType = {
        email: "",
        name: "",
        subject: "",
        message: "",
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: values => {



            fetch('http://localhost:3001/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }).then((response) => {
                if (response.ok) {
                    alert('Email sent successfully!');
                } else {
                    alert('Failed to send email.');
                }
            }).catch((error) => {
                console.error(error);
                alert('Failed to send email.');
            });
        },
    });



    return (
        <div className={"px-[35%] w-full h-screen flex justify-center items-center"}>
            <form ref={form} onSubmit={formik.handleSubmit} className={"bg-content1 w-full p-4 rounded flex flex-col gap-4"}>
                <h1 className={"text-[24px] font-bold"}>Email sender</h1>
                <Input value={formik.values.name} name={"name"} onChange={formik.handleChange} label={"Name"}/>
                <Input type={"email"} value={formik.values.email} name={"email"} onChange={formik.handleChange} label={"Email"}/>
                <Input value={formik.values.subject} name={"subject"} onChange={formik.handleChange} label={"Subject"}/>
                <Textarea value={formik.values.message} name={"message"} onChange={formik.handleChange} label={"Message"}/>
                <Button color={"primary"} type={"submit"}>Submit</Button>
            </form>
        </div>
    );
};

export default EmailSender;