import { NextApiHandler, NextApiRequest } from "../../node_modules/next/dist/shared/lib/utils"

const handler: NextApiHandler = (req, res) => {
    res.status(200).json({ text: 'Hello!' })
}

export default handler