const puppeteer = require('puppeteer')
const { toMatchImageSnapshot } = require('jest-image-snapshot') //Importo la librería de Jest que me servirá para realiar las capturas de pantalla
expect.extend({toMatchImageSnapshot})

describe('Visual test',()=> { 

    let browser
    let page
   
    beforeAll(async()=>{
        browser = await puppeteer.launch({
            headless: false, 
            defaultViewport: null,
            //slowMo: 500
        })
        
        page = await browser.newPage()
        await page.goto('https://ualki.com/es', {waitUntil : 'networkidle0'})
    },10000)
    afterAll(async()=>{
        await browser.close()
    })
    

    test('Snapshot de toda la pagina', async() =>{ //Es una función asincrona porque necesito esperar a que se abra el navegador
    
         await page.waitForSelector('img')//Esperamos por un selector; Hago captura de todo el sitio

         const screenshot = await page.screenshot() //Hacemos una captura de pantalla
         expect(screenshot).toMatchImageSnapshot() 
         /*expect es una assertion, o sea que va a 
         esperar y va a verificar que nuestro screenshot
         tenga un match de ImageSnapshot, que coincida 
         con el snapshot que tenemos. El snapshot son los archivos que se crean
         entonces la primera vez que se corra el test, va a crear el snapshot;
         y las veces posteriores ya va fallar porque ya no va a coincidir con el snapshot*/

    }, 35000)

    test('Snapshot de solo un elemento', async() =>{ //Es una función asincrona porque necesito esperar a que se abra el navegador
    
        const elemento= await page.waitForSelector('body > div > div > div > div > a > img')//Esperamos por un selector;Hago captura del elemento en específico

        const screenshot = await elemento.screenshot() //Hacemos una captura de pantalla del elemento
        expect(screenshot).toMatchImageSnapshot( {
        //Voy a pasar un elemento con propiedades:
        failureThreshold: 0.05, //Umbral de fallo que le quiero dar, por defecto es de 0.01%, es decir si cambia 0.01% va a fallar
        failureThresholdType: 'percent', //En vez de esté dado en pixeles como es por default aquí se lo doy en porcentaje.
    })

   }, 35000)

   test('Snapshot de dispositivo movil', async() =>{ //Es una función asincrona porque necesito esperar a que se abra el navegador
    
    const iphone = puppeteer.devices['iPhone 13 Pro Max']
    await page.emulate(iphone)

    await page.waitForSelector('img')//Esperamos por un selector; Hago captura de todo el sitio

    const screenshot = await page.screenshot() //Hacemos una captura de pantalla
    expect(screenshot).toMatchImageSnapshot( {
    
    failureThreshold: 0.05,
    failureThresholdType: 'percent',
})

}, 35000)

test('Remover una imagen antes de crear un Snapshot', async() =>{ //Es una función asincrona porque necesito esperar a que se abra el navegador
    
    await page.waitForSelector('img')//Esperamos por un selector; Hago captura de todo el sitio

    await page.evaluate(()=>

        (document.querySelectorAll('img')|| []).forEach((img) =>img.remove())) 
        /*Lo que hace ésta función es lo siguiente:
        Va a evaluar todo los selector que en éste caso sean imágenes, 
        y las va a ir removiendo antes de realizar la captura de pantalla que realizamos
        en los pasos mas abajo*/

    const screenshot = await page.screenshot() //Hacemos una captura de pantalla
    expect(screenshot).toMatchImageSnapshot( {
    
    failureThreshold: 0.05,
    failureThresholdType: 'percent',
})

}, 35000)


})