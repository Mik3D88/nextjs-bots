export async function getOptions(isDev) {
    let options
    options = {
        args: [],
        // execPath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        headless: true,
        browserWSEndpoint: "ws://chromium-service.herokuapp.com/"
    }
    return options
}