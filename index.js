import express from 'express'
import path from 'path'
import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

sgMail.setApiKey(process.env.SGKEY)

app.use(express.json())

app.use(express.static('app'))

app.get('/', (req, res) => {
    res.sendFile(`${path.resolve()}/index.html`)
    
// const msg = {
//   to: 'mendietr@mailinator.com', // Change to your recipient
//   from: process.env.FROM, // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })
})

app.post('/send', async (req, res) => {
    const { to, subject, html } = req.body

    const msg = {
        to,
        from: process.env.FROM,
        subject,
        html
    }

    try {
        await sgMail.send(msg)
        res.sendStatus(204)
    } catch (e) {
        const messages = e.response.body.errors.map(e => e.message).join('')
        // console.log(e.response.body.errors)
        res.status(400).send(messages)
    }
})

app.listen(3000, () => console.log('la app esta corriendo!'))