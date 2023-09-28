const puppeteer = require('puppeteer')

describe('Capturas de Pantalla',()=> { //Función que recibe un callback

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
        await page.goto('https://ualki.com/es', {waitUntil : 'networkidle0'})

    },100000) //Agrego un Timeout a los Hooks para poder visualizar mejor los tests y para evitar alguna falla a futuro
    
    afterAll(async()=>{
        await browser.close()
    })
    

    test('Captura de pantalla completa', async() =>{ //Es una función asincrona porque necesito esperar a que se abra el navegador
        
        await page.screenshot({
            path:'./capturasDePantalla.png',
            fullPage: true,
        })
        // await page.waitForTimeout(3000)
        
    }, 35000)    

    test('Captura de pantalla seleccionando area', async() =>{ //Es una función asincrona porque necesito esperar a que se abra el navegador
        
        await page.screenshot({
            path:'./capturasDePantallaSeleccionandoArea.png',
            clip: {
                x: 0,
                y: 0,
                width: 500,
                height: 500,
            }
        })
        // await page.waitForTimeout(3000)
        
    }, 35000)  
    
    test('Captura de pantalla con fondo transparente', async() =>{ //Es una función asincrona porque necesito esperar a que se abra el navegador
        
        await page.evaluate(()=> (document.body.style.background = 'transparent')) //Para evalue el documento, y le dé un estilo transparente al color de fondo del cuerpo
        
        await page.screenshot({
            path:'./capturasDePantallaConFondoTransparente.png',
            omitBackground: true, //habilito como verdadera la opción para que omita el color de fondo
        })
        // await page.waitForTimeout(3000)
        
    }, 35000) 

    test('Captura de pantalla a un elemento en específico', async() =>{ //Es una función asincrona porque necesito esperar a que se abra el navegador
        
        const elemento = await page.waitForSelector('body > div > div > div > div > a > img')
        
        await elemento.screenshot({ //En vez de hacer captura de pantalla de la página indico que haga captura de pantalla del elemento
            path:'./capturasDePantallaDeUnElemento.png',
            //omitBackground: true, //habilito como verdadera la opción para que omita el color de fondo
        })
        // await page.waitForTimeout(3000)
        
    }, 35000) 


}, 350000)