const puppeteer = require('puppeteer')

describe('Geolocalizacion',()=> { 

    let browser
    let page
   
    beforeAll(async()=>{
        browser = await puppeteer.launch({
            headless: false, 
            defaultViewport: null,
            //slowMo: 500
        })
        
        page = await browser.newPage()
        
    },10000)
    afterAll(async()=>{
        await browser.close()
    })
    

    test('Cambio de geolocalizacion', async() =>{ 
    
        const context = browser.defaultBrowserContext()

        await context.overridePermissions('https://chercher.tech/practice/geo-location.html', [
            'geolocation'
        ])
        /*Sobre escribimos los permisos, y le paso el sitio web que le solicita aceptar los permisos. 
        Luego recibe un arreglo, en el arreglo voy a pasar lo que voy a sobre escribir, en éste 
        caso la geolocalización*/


        await page.setGeolocation({ latitude: 90, longitude: 20 })//Sobre escribo la geolocalización

        await page.goto('https://chercher.tech/practice/geo-location.html') //Abro el sitio web para visualizar mi geolocalización
        
        await page.waitForTimeout(5000)
         

    }, 35000)

    


})