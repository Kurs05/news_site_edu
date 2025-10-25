import { Router } from 'express'
import {ArticleService } from './article.service.js'
const router = Router()

const articleService = new ArticleService()

router.get('/', async (req, res) => {
    try {
        const articles = await articleService.getAllArticles()
        res.status(200).json(articles)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Получить один твит по ID
router.get('/:id', async (req, res) => {
    try {
        const article = await articleService.getArticleById(req.params.id)
        res.status(200).json(article)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

router.post('/',async (req, res) => {
    try {
        const article = await articleService.createArticle(req.body)
        res.status(201).json(article)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
router.put('/:id', async (req, res) => {
    try {
        const article = await articleService.updateArticle(req.params.id, req.body)
        res.status(200).json(article)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Удалить твит
router.delete('/:id', async (req, res) => {
   

    try {
        await articleService.deleteArticle(req.params.id)
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
export const articleRouter = router