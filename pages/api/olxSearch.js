import getPage from '../../lib/chromium'

const olx = async (req, res) => {
    try {
        const { method, body } = req
        const { url } = body;
        if (method === 'POST') {
            try {
                const page = await getPage();
                await page.goto(url, { waitUntil: ['networkidle2'] })
                const listItems = await page.evaluate(() => {
                    let itens = []
                    document.querySelectorAll("div.sc-12rk7z2-2.gSNULD").forEach(item => {
                        const arr = item.children[1].innerText.split("\n")
                        itens.push({
                            title: arr[0],
                            value: arr[1],
                            paymentmethod: arr[2],
                            location: arr[4],
                            createdDate: arr[5],
                        })
                    });
                    return itens
                })
                await page.close()
                res.status(200).json({ result: listItems, success: true })

            } catch (error) {
                console.log(error)
                res.status(400).json({ success: true, error })
            }
        } else if (method === 'GET') {

        } else {
            res.setHeader('Allow', ['POST', 'GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
        }

    } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message })
    }
}
export default olx;