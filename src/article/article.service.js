import axios from 'axios'

const STRAPI_URL = 'http://localhost:1337/api'
const API_TOKEN = '305bc4fee4fb02094d32ceb59eeb840d7c02e1e3e560103c1e25c9c95f9021622ae2a49ef43505b2787661554d0058bb546c71c1e1d5d6fc6df9d8cf2065df3ad3d062016a3b3217197cfdd6fed4009fc7701855f0c01c9f3adb50defe0b59311ae037c73eb545dd7b3e4c80137d8408f171124f556a8a0aa268eb300dde3983'

export class ArticleService {
    constructor() {
        this.api = axios.create({
            baseURL: `${STRAPI_URL}/articles`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}` // ВКЛЮЧАЕМ токен
            }
        })

        // Добавляем interceptor для логирования
        this.api.interceptors.request.use(request => {
            console.log('🚀 Запрос к Strapi:', request.method.toUpperCase(), request.url)
            console.log('📋 Заголовки:', request.headers)
            return request
        })

        this.api.interceptors.response.use(
            response => {
                console.log('✅ Ответ от Strapi:', response.status, response.data)
                return response
            },
            error => {
                console.error('❌ Ошибка от Strapi:')
                console.error('Статус:', error.response?.status)
                console.error('Данные:', error.response?.data)
                console.error('URL:', error.config?.url)
                return Promise.reject(error)
            }
        )
    }

    async getAllArticles() {
        try {
            console.log('📡 Запрашиваем все статьи...')
            const response = await this.api.get('/')
            return response.data.data
        } catch (error) {
            throw new Error(`Ошибка получения статей: ${error.response?.data?.error?.message || error.message}`)
        }
    }

    async getArticleById(id) {
        try {
            console.log(`📡 Запрашиваем статью с ID: ${id}`)
            const response = await this.api.get(`/${id}`)
            return response.data.data
        } catch (error) {
            throw new Error(`Ошибка получения статьи: ${error.response?.data?.error?.message || error.message}`)
        }
    }

    async createArticle(articleData) {
        try {
            console.log('📡 Создаём новую статью:', articleData)
            const response = await this.api.post('/', {
                data: articleData
            })
            return response.data.data
        } catch (error) {
            throw new Error(`Ошибка создания статьи: ${error.response?.data?.error?.message || error.message}`)
        }
    }

    async updateArticle(id, articleData) {
        try {
            console.log(`📡 Обновляем статью ${id}:`, articleData)
            const response = await this.api.put(`/${id}`, {
                data: articleData
            })
            return response.data.data
        } catch (error) {
            throw new Error(`Ошибка обновления статьи: ${error.response?.data?.error?.message || error.message}`)
        }
    }

    async deleteArticle(id) {
        try {
            console.log(`📡 Удаляем статью с ID: ${id}`)
            const response = await this.api.delete(`/${id}`)
            return response.data.data
        } catch (error) {
            throw new Error(`Ошибка удаления статьи: ${error.response?.data?.error?.message || error.message}`)
        }
    }
}
