import express, { type Request, type Response } from 'express'
import getRawBody from 'raw-body'
import puppeteer from "puppeteer";
import dotenv from 'dotenv'
import { AuthAPIMiddleware } from './helpers';

dotenv.config({ path: '.env' })
const app = express()

app.use(AuthAPIMiddleware)
app.use(async (req, res, next) => {
    try {
        req.body = await getRawBody(req, {
            encoding: 'utf8',
            length: req.headers['content-length']
        })
        next()
    } catch (err) {
        next(err)
    }
});

app.post('/', async (req: Request, res: Response) => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true,
    })
    const page = await browser.newPage()

    await page.setContent(req.body, { waitUntil: 'domcontentloaded' });
    const content = await page.content()
    await browser.close()

    res.contentType('text/plain').send(content)
})

app.use(async (req: Request, res: Response) => {
    res.status(404).json({
        status: 404,
        message: 'POST to / to render HTML content',
    })
})

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on http://127.0.0.1:${process.env.SERVER_PORT}`)
})