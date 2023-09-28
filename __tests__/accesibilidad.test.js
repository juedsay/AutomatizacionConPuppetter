const puppeteer = require('puppeteer')
const { AxePuppeteer } = require('@axe-core/puppeteer')

describe('Accesibilidad',()=> { 

    let browser
    let page
   
    beforeAll(async()=>{
        browser = await puppeteer.launch({
            headless: true, 
            defaultViewport: null,
            //slowMo: 500
        })
        
        page = await browser.newPage()
       
        
    },10000)
    afterAll(async()=>{
        await browser.close()
    })
    

    test('Snapshot de accesibilidad', async() =>{ 
    
        await page.goto('https://ualki.com/es')
        await page.waitForSelector('img')
        const snapshot = await page.accessibility.snapshot()//Va a sacar un snapshot de la accesibilidad del sitio web que accedimos
        console.log(snapshot)
         

    }, 35000)

    test('Probar accesibilidad con Axe', async() =>{ 
        
        await page.setBypassCSP(true)//Sirve para omitir la politica de seguridad de contenido durante la navegación
        await page.goto('https://ualki.com/es')
        await page.waitForSelector('img')
        
        const result = await new AxePuppeteer(page).analyze()//Llamamos a la función AxePuppeteer y con el método analyze se encargará de analizar la página
        console.log(result)//Aquí nos mostrará los resultados del analisis por consola

        console.log(result.violations[0].nodes[0])//Podemos elegir de imprimir mas propiedades en específico, en éste caso solamente elijo la primera, solo el nodo primero

    }, 35000)

    


})