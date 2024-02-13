import { createCanvas, registerFont } from "canvas";
import { NextApiRequest, NextApiResponse } from "next";

const IMAGE_WIDTH = 1200
const IMAGE_HEIGHT = 630
const MAX_CHARACTERS = 12

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    registerFont('public/Inter-VariableFont.ttf', { family: 'Inter' });

    if (req.method !== "GET") {
        return res.send(`${req.method} not supported`);
    }

    const { query: { title } } = req

    if (typeof title !== "string") {
        return res.status(400).send("Title must be of type string")
    }

    if (title.length > MAX_CHARACTERS) {
        return res.status(400).json(`Text should not be longer than ${MAX_CHARACTERS} characters`)
    }

    // Create canvas
    const canvas = createCanvas(IMAGE_WIDTH, IMAGE_HEIGHT);
    const ctx = canvas.getContext('2d');
    // Set background color
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);

    // Set text properties
    ctx.font = '900 120px Inter';
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const slashWidth = ctx.measureText("/").width;
    const titleWidth = ctx.measureText(title).width
    ctx.fillText(title, (IMAGE_WIDTH / 2) - (slashWidth / 2), IMAGE_HEIGHT / 2)

    ctx.fillStyle = "#EAB308"
    ctx.fillText("/", (IMAGE_WIDTH / 2) + (titleWidth / 2), IMAGE_HEIGHT / 2)
    const image = canvas.toBuffer()
    return res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': image.length
    }).end(image);
}