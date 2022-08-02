import getPage from '../../../../lib/chromium'
import getBrowser from '../../../../lib/chromium'

const crash = async (req, res) => {
    try {
        const { method, body } = req
        const { url } = body;
        if (method === 'POST') {
            try {
                // https://tipminer.com/blaze/
                const page = await getPage();
                await page.goto(url, { waitUntil: ['networkidle2'] })
                const result = await page.evaluate(() => {
                    // tres ultimos resultados
                    let resultado = [];
                    for (let index = 0; index <= 10; index++) {
                        const item = document.querySelectorAll('.cell.v-popper--has-tooltip')[index].innerText
                        const [valor, hora] = item.split("\n")
                        resultado.push({
                            valor, hora
                        })
                    }
                    return resultado
                });
                await page.close()
                res.status(200).json({ result, success: true })
            } catch (error) {
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
export default crash;