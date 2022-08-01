import getPage from '../../../lib/chromium'

const cdbSearch = async (req, res) => {
    try {
        const { method, body } = req
        const { url, cidade } = body;
        if (method === 'POST') {
            try {
                const page = await getPage();
                await page.goto(url, { waitUntil: ['networkidle2'] })
                const topAcompanhantes = await page.$$eval("div.coelhinhastop-acompanhantes", list => {
                    return list.map(listitem => {
                        const name = listitem.querySelector("a").href.split("/")[4]
                        const cidade = listitem.querySelector("a").href.split("/")[5].replace("aviso-legal-","").replace(".html","")
                        return {
                            name, cidade
                        }
                    });
                })
                const selecaoNacional = await page.$$eval("div.selecaonacional-acompanhantes", list => {
                    return list.map(listitem => {
                        const name = listitem.querySelector("a").href.split("/")[4]
                        const cidade = listitem.querySelector("a").href.split("/")[5].replace("aviso-legal-","").replace(".html","")
                        return { name, cidade }
                    });
                })
                res.status(200).json({ topAcompanhantes, selecaoNacional, success: true })

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
export default cdbSearch;