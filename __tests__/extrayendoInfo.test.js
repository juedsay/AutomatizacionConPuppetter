const puppeteer = require('puppeteer')

describe('Extrayendo informacion',()=> { //Función que recibe un callback

    it('Extraer el titulo de la pagina y la url', async() =>{ //Es una función asincrona porque necesito esperar a que se abra el navegador
        const browser = await puppeteer.launch({
            headless: false, //Si está en falso SI se puede ver el navegador, si está en verdadero NO se puede ver el Navegador
            defaultViewport: null,//Hace que la web tome el tamaño de la ventana
            //slowMo: 500
        })

        const page = await browser.newPage()
        await page.goto('https://www.github.com', {waitUntil : 'networkidle0'})

        const titulo = await page.title()
        const url = await page.url()

        console.log('titulo', titulo )
        console.log('url', url )

        await browser.close()    
        
    }, 35000)

    it('Extraer la información de un elemento', async() =>{ //Es una función asincrona porque necesito esperar a que se abra el navegador
        const browser = await puppeteer.launch({
            headless: false, //Si está en falso SI se puede ver el navegador, si está en verdadero NO se puede ver el Navegador
            defaultViewport: null,//Hace que la web tome el tamaño de la ventana
            //slowMo: 500
        })

        const page = await browser.newPage()
        await page.goto('https://www.github.com', {waitUntil : 'networkidle0'})
        await page.waitForSelector('body > div.logged-out.env-production.page-responsive.header-overlay.home-campaign > div.position-relative.js-header-wrapper > header > div > div.HeaderMenu--logged-out.p-responsive.height-fit.position-lg-relative.d-lg-flex.flex-column.flex-auto.pt-7.pb-4.top-0 > div > div > a')

        //Extraigo la información utilizando un CSS Selector:
        const nombreBoton = await page.$eval('body > div.logged-out.env-production.page-responsive.header-overlay.home-campaign > div.position-relative.js-header-wrapper > header > div > div.HeaderMenu--logged-out.p-responsive.height-fit.position-lg-relative.d-lg-flex.flex-column.flex-auto.pt-7.pb-4.top-0 > div > div > a',(button)=> button.textContent)
        console.log('nombreBoton', nombreBoton )

        //Extraigo la información utilizando un Xpath:
        //$x: me regresaría un arreglo de los elementos si es los encontró por medio de Xpath, entonces tengo que destructurar el arreglo:
        const [button] = await page.$x('/html/body/div[1]/footer/div[1]/div/div[1]/div/a')
        const propiedad = await button.getProperty('textContent')
        const texto = await propiedad.jsonValue()

        // console.log('texto', texto )

        //Segunda forma de extraer información con un Xpath selector:
        const texto2 = await page.evaluate((name) => name.textContent, button)

        console.log('texto2', texto2 )

        //Tercer manera de extraer información con un Xpath selector:
        const button3 = await page.waitForXPath('/html/body/div[1]/footer/div[1]/div/div[1]/div/a')
        const texto3 = await page.evaluate((name) => name.textContent, button3)
        console.log('texto3', texto3 )

        await browser.close() 
           
        
    }, 35000)

    it('Contar elementos de una pagina', async() =>{ //Es una función asincrona porque necesito esperar a que se abra el navegador
        const browser = await puppeteer.launch({
            headless: false, //Si está en falso SI se puede ver el navegador, si está en verdadero NO se puede ver el Navegador
            defaultViewport: null,//Hace que la web tome el tamaño de la ventana
            //slowMo: 500
        })

        const page = await browser.newPage()
        await page.goto('https://www.github.com', {waitUntil : 'networkidle0'})

        //Me va contar todos los elementos del array imagenes, y me va a mostrar en consola el valor:
        const images = await page.$$eval('img',(imagenes)=> imagenes.length)
        console.log('images', images )

        await browser.close()    
        
    }, 35000)

})