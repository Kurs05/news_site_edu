import express from 'express'
import {articleRouter } from './src/article/article.controller.js'
const app = express()

async function main() {
    app.use(express.json())
    app.use('/api/article',articleRouter)
    app.listen(4200, () => {
        console.log('Server is running on port 4200')
    })
}
main()