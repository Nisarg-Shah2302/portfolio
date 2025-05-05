import type { NextApiRequest, NextApiResponse } from "next";
// import sgMail from "@sendgrid/mail";
import { Resend } from "resend";

// sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_MAIL_API_KEY);

type Data = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "POST") {
        const {
            name,
            email,
            message,
        }: { name: string; email: string; message: string } = req.body;
        const msg = `Name: ${name}\r\n Email: ${email}\r\n Message: ${message}`;
        const data = {
            to: process.env.NEXT_PUBLIC_MAIL_TO as string,
            from: email,
            subject: `${name.toUpperCase()} sent you a message from Portfolio`,
            text: `Email => ${email}`,
            html: msg.replace(/\r\n/g, "<br>"),
        };
        try {
            // await sgMail.send(data);
            await resend.emails.send(data);
            res.status(200).json({ message: "Your message was sent successfully." });
        } catch (err) {
            res.status(500).json({ message: `There was an error sending your message. ${err}` });
        }
    }
}