import getPage from '../../../lib/chromium'

const cnpjBiz = async (req, res) => {
    try {
        const { method, body } = req
        const { urls } = body;
        if (method === 'POST') {
            try {
                const page = await getPage();
                let detailsOfList = []
                console.log("Links para busca", urls.length)

                for (let index = 0; index < urls.length; index++) {
                    const arrCnpjItems = urls[index];

                    await page.goto(arrCnpjItems.ref, { waitUntil: ['networkidle2'] })
                    const result = await page.evaluate(() => {
                        let arrResult = []
                        document.querySelectorAll("p").forEach(item => {
                            const cnpjDetails = []
                            let result = item.innerText.split(":")
                            const [key, value] = result;
                            cnpjDetails.push({
                                type: key, value
                            })
                            arrResult.push(cnpjDetails);
                        })
                        return arrResult
                    })
                    detailsOfList.push({
                        link: arrCnpjItems.ref,
                        ...result
                    })
                }
                res.status(200).json({ detailsOfList, success: true })

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