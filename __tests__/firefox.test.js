const puppeteer = require('puppeteer')

describe('Extrayendo informacion',()=> { //Función que recibe un callback

    let browser
    let page
    
    beforeAll(async()=>{
        browser = await puppeteer.launch({
            headless: false,
            product: 'firefox',//Selecciono el navegador en el que deseo que se ejecuten las pruebas, en éste caso Firefox (por defecto está Chromium)
            defaultViewport: null,//Hace que la web tome el tamaño de la ventana
            //slowMo: 500
        })
        
        page = await browser.newPage()
    },10000)
    afterAll(async()=>{
        await browser.close()
    })
    

    it('Extraer el titulo de la pagina y la url', async() =>{ 
       await page.goto('https://www.github.com', {waitUntil : 'networkidle0'})

        const titulo = await page.title()
        const url = await page.url()

        console.log('titulo', titulo )
        console.log('url', url )

           
        
    }, 35000)

    it('Extraer la información de un elemento', async() =>{ 
        
        await page.goto('https://www.github.com', {waitUntil : 'networkidle0'})
        await page.waitForSelector('body > div.logged-out.env-production.page-responsive.header-overlay.home-campaign > div.position-relative.js-header-wrapper > header > div > div.HeaderMenu--logged-out.p-responsive.height-fit.position-lg-relative.d-lg-flex.flex-column.flex-auto.pt-7.pb-4.top-0 > div > div > a')

        
        const nombreBoton = await page.$eval('body > div.logged-out.env-production.page-responsive.header-overlay.home-campaign > div.position-relative.js-header-wrapper > header > div > div.HeaderMenu--logged-out.p-responsive.height-fit.position-lg-relative.d-lg-flex.flex-column.flex-auto.pt-7.pb-4.top-0 > div > div > a',(button)=> button.textContent)
        console.log('nombreBoton', nombreBoton )

        
        const [button] = await page.$x('/html/body/div[1]/footer/div[1]/div/div[1]/div/a')
        const propiedad = await button.getProperty('textContent')
        const texto = await propiedad.jsonValue()

        console.log('texto', texto )

        
        const texto2 = await page.evaluate((name) => name.textContent, button)

        console.log('texto2', texto2 )

        
        const button3 = await page.waitForXPath('/html/body/div[1]/footer/div[1]/div/div[1]/div/a')
        const texto3 = await page.evaluate((name) => name.textContent, button3)
        console.log('texto3', texto3 )

         
           
        
    }, 35000)

    it('Contar elementos de una pagina', async() =>{ 
        
        await page.goto('https://www.github.com', {waitUntil : 'networkidle0'})

        
        const images = await page.$$eval('img',(imagenes)=> imagenes.length)
        console.log('images', images )

           
        
    }, 35000)

})