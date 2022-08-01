import getPage from '../../../lib/chromium'

const cdbSearch = async (req, res) => {
    try {
        const { method, body } = req
        const { topAcompanhantes, selecaoNacional } = body;
        if (method === 'POST') {
            try {
                let resultado = []
                const arrItens = [...selecaoNacional, ...topAcompanhantes]
                for (let index = 0; index < arrItens.length; index++) {
                    const contato = arrItens[index];
                    const { name, cidade } = contato
                    const url = `https://coelhinhadobrasil.com.br/acompanhantes/${name}/${cidade}`
                    const page = await getPage();
                    await page.goto(url, { waitUntil: ['networkidle2'] })
                    const [valor, numero] = await page.$$eval(".perfil-texto3", list => {
                        return list.map(item => item.innerText)
                    })
                    resultado.push({
                        name, cidade, valor, numero
                    })
                }
                res.status(200).json({ resultado, success: true })

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