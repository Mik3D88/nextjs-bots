// import { format } from 'date-fns'
import puppeteer from 'puppeteer'
import { getOptions } from './chromeOptions'
// const chromiumpath = process.env.chromiumpath

let _page
let _browser

async function getBrowser() {
  
  // if (_browser) {
  //   return _browser
  // }
  const options = await getOptions()
  // _browser = await puppeteer.launch(options)//
  _browser = await puppeteer.connect(options)//
  //.connect(options)
  return _browser
}

async function getPage() {
  // if (_page) {
  //   return _page
  // }

  const browser = await getBrowser()

  _page = await browser.newPage()

  return _page
}

module.exports = getPage