import getPage from '../../../lib/chromium'

const cnpjBiz = async (req, res) => {
    try {
        const { method, body } = req
        const { url, numberOfPages } = body;
        if (method === 'POST') {
            try {
                const page = await getPage();
                await page.goto(url, { waitUntil: ['networkidle2'] })
                let urls = []
                console.log("Iniciando a pesquisa no CNPJ_BIZ")

                for (let index = 0; index < numberOfPages; index++) {
                    await page.waitForSelector("body > div > main > div.max-w-4xl.mx-auto.bg-white.shadow.overflow-hidden.sm\\:rounded-md > div.mt-5.mb-5.max-w-md.mx-auto.sm\\:flex.sm\\:justify-center.md\\:mt-8 > div > a")
                    const listUrl = await page.evaluate(() => {
                        let itens = []
                        document.querySelectorAll("ul > li > a").forEach(item => {
                            itens.push({
                                ref: item.href
                            })
                        })
                        return itens
                    })
                    urls.push(...listUrl)
                    const nextPage = await page.evaluate(() => {
                        return document.querySelector("body > div > main > div.max-w-4xl.mx-auto.bg-white.shadow.overflow-hidden.sm\\:rounded-md > div.mt-5.mb-5.max-w-md.mx-auto.sm\\:flex.sm\\:justify-center.md\\:mt-8 > div > a").href
                    })
                    await page.goto(nextPage, { waitUntil: ['networkidle2'] })
                }
                console.log("Finalizando a pesquisa no CNPJ_BIZ", urls.length)
                await page.close()
                res.status(200).json({ urls, success: true })
            } catch (error) {
                console.log(error)
                res.status(400).json({ success: true, error })
            }
        } else {
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
        }

    } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message })
    }
}
export default cnpjBiz;