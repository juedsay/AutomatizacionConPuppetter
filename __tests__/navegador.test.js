const puppeteer = require('puppeteer')

describe('Mi primer test en pupeteer',()=> { //Función que recibe un callback

    it('Debe abrir y cerrar el navegador', async() =>{ //Es una función asincrona porque necesito esperar a que se abra el navegador
        const browser = await puppeteer.launch({
            headless: false, //Si está en falso SI se puede ver el navegador, si está en verdadero NO se puede ver el Navegador
            defaultViewport: null,//Hace que la web tome el tamaño de la ventana

        })
        const page = await browser.newPage()
        await page.goto('https://www.github.com/')
        await page.waitForTimeout(2000)
        await page.waitForSelector('body > div.logged-out.env-production.page-responsive.header-overlay.home-campaign > div.position-relative.js-header-wrapper > header > div > div.d-flex.flex-justify-between.flex-items-center.width-full.width-lg-auto > a > svg')
        //Recarga la página
        await page.reload()
        await page.waitForSelector('body > div.logged-out.env-production.page-responsive.header-overlay.home-campaign > div.position-relative.js-header-wrapper > header > div > div.d-flex.flex-justify-between.flex-items-center.width-full.width-lg-auto > a > svg')
        //Navegar a otro sitio
        await page.goto('https://www.google.com/')
        await page.waitForSelector('body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img')
        //Navegar hacia atras
        await page.goBack()
        await page.waitForSelector('body > div.logged-out.env-production.page-responsive.header-overlay.home-campaign > div.position-relative.js-header-wrapper > header > div > div.d-flex.flex-justify-between.flex-items-center.width-full.width-lg-auto > a > svg')
        //Navegar hacia Adelante
        await page.goForward()
       //---------------------------//

        //Abrir otra página
       const page2 = await browser.newPage()
       await page2.goto('https://linkedin.com/')

        await browser.close()
    }, 35000)

})