const puppeteer = require('puppeteer')
const {getText, getCount} = require('../lib/helpers')//Importamos nuestra librería que contiene los Helpers

describe('Extrayendo informacion',()=> { //Función que recibe un callback

    //Creo dos varibles globales:
    let browser
    let page
   
    beforeAll(async()=>{
        browser = await puppeteer.launch({
            headless: true, //Si está en falso SI se puede ver el navegador, si está en verdadero NO se puede ver el Navegador
            defaultViewport: null,//Hace que la web tome el tamaño de la ventana
            //slowMo: 500
        })
        
        page = await browser.newPage()
    },10000) //Agrego un Timeout a los Hooks para poder visualizar mejor los tests y para evitar alguna falla a futuro
    afterAll(async()=>{
        await browser.close()
    })
    //Incluso si se accede a la misma web se puede quitar el método de page.goto repetido para ahorrar código

    it('Extraer el titulo de la pagina y la url', async() =>{ //Es una función asincrona porque necesito esperar a que se abra el navegador
       await page.goto('https://www.github.com', {waitUntil : 'networkidle0'})

        const titulo = await page.title()
        const url = await page.url()

        console.log('titulo', titulo )
        console.log('url', url )

           
        
    }, 35000)

    it('Extraer la información de un elemento', async() =>{ //Es una función asincrona porque necesito esperar a que se abra el navegador
        
        await page.goto('https://www.github.com', {waitUntil : 'networkidle0'})
        await page.waitForSelector('body > div.logged-out.env-production.page-responsive.header-overlay.home-campaign > div.position-relative.js-header-wrapper > header > div > div.HeaderMenu--logged-out.p-responsive.height-fit.position-lg-relative.d-lg-flex.flex-column.flex-auto.pt-7.pb-4.top-0 > div > div > a')

        //Implemento el Helper getText:
        const nombreBoton = await getText(page, 'body > div.logged-out.env-production.page-responsive.header-overlay.home-campaign > div.position-relative.js-header-wrapper > header > div > div.HeaderMenu--logged-out.p-responsive.height-fit.position-lg-relative.d-lg-flex.flex-column.flex-auto.pt-7.pb-4.top-0 > div > div > a')
        console.log('nombreBoton', nombreBoton )
        
        
    }, 35000)

    it('Contar elementos de una pagina', async() =>{ //Es una función asincrona porque necesito esperar a que se abra el navegador
        
        await page.goto('https://www.github.com', {waitUntil : 'networkidle0'})

        //Implemento el Helper getCount:
        const images = await getCount(page, 'img')
        console.log('images', images )

           
        
    }, 35000)

})