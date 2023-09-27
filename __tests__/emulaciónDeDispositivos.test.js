const puppeteer = require('puppeteer')

describe('Emulacion de dispositivos',()=> { //Función que recibe un callback

    let browser
    let page
    
    beforeAll(async()=>{
        browser = await puppeteer.launch({
            headless: false, //Si está en falso SI se puede ver el navegador, si está en verdadero NO se puede ver el Navegador
            defaultViewport: null,//Hace que la web tome el tamaño de la ventana
            slowMo: 500
        })
        
        // page = await browser.newPage()
        // await page.goto('https://www.github.com', {waitUntil : 'networkidle0'})

        /*Para generar un contexto de modo incógnito se tendría 
        que modificar las dos líneas de código de arriba por las siguientes:*/
        
        const context = await browser.createIncognitoBrowserContext()
        page = await context.newPage()
        await page.goto('https://www.github.com', {waitUntil : 'networkidle0'})

    },10000) //Agrego un Timeout a los Hooks para poder visualizar mejor los tests y para evitar alguna falla a futuro
    
    afterAll(async()=>{
        await browser.close()
    })
    

    test('Emulando dispositivos de forma manual', async() =>{ //Es una función asincrona porque necesito esperar a que se abra el navegador
       
        await page.emulate({
            name: 'Mi dispositivo',
            viewport: {
                width: 375,
                height: 667,
                deviceScaleFactor: 2,
                isMobile: true,
                hasTouch: true,
                isLandscape: false //Para emular de forma horizontal
            },
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59', //Un Ejemplo
        })

           await page.waitForTimeout(3000)
        
    }, 35000)    


    test('Emulando dispositivo de escritorio', async() =>{ //Es una función asincrona porque necesito esperar a que se abra el navegador
       
        await page.setViewport({
            width:800,
            height: 600,        
        })
           await page.waitForTimeout(3000)
        
    }, 35000)   

    test('Emulando sitio en una tablet', async() =>{ //Es una función asincrona porque necesito esperar a que se abra el navegador
       
        const tablet = puppeteer.devices['iPad Pro']
        await page.emulate(tablet)

        await page.waitForTimeout(3000)
        
    }, 35000)  

    test('Emulando sitio en una tablet en modo landscape', async() =>{ //Es una función asincrona porque necesito esperar a que se abra el navegador
       
        const tablet = puppeteer.devices['iPad Pro landscape']
        await page.emulate(tablet)

        await page.waitForTimeout(3000)
        
    }, 35000)

    test('Emulando sitio en un celular', async() =>{ //Es una función asincrona porque necesito esperar a que se abra el navegador
       
        const iphone = puppeteer.devices['iPhone 13 Pro Max']
        await page.emulate(iphone)

        await page.waitForTimeout(3000)
        
    }, 35000)


})