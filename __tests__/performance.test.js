const puppeteer = require('puppeteer')
const fs = require('fs') //Importo la Librería fs que me servirá para generar los archivos de las imágenes

describe('Performance',()=> { 

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
    

    test('Medir el performance de la automatizacion', async() =>{ 
        
        await page.goto('https://ualki.com/es')
        await page.waitForSelector('img')
        const metrics = await page.metrics()
        console.log(metrics)        

    }, 35000)

    // test('Medir el performance de la pagina', async() =>{ 
        // await page.goto('https://ualki.com/es')
    //     await page.waitForSelector('img')
    //     const metrics2 = await page.evaluate(()=> JSON.stringify(window.performance)) //Hago que me convierta la cadena de los resultados en un JSON, y accedo a los elemtos del navedor, en éste caso a la ventana
    //     console.log(metrics2)
         

    // }, 35000)

    test('Debera medir el perfomance del page load', async () => {

		await page.tracing.start({ path: 'profile.json' })
		await page.goto('https://ualki.com/es')
		await page.tracing.stop()

	}, 35000)

    test('Medir el performance del page load con screeshots', async() =>{ 
    
        await page.tracing.start({ path: 'profile.json', screenshots: true})//Me permite empezar, escuchar todos los eventos que se realicen
        await page.goto('https://ualki.com/es')
        await page.tracing.stop()         

    }, 35000)

    test('Medir el performance del page load con screeshots y extrayendolos', async() =>{ 
    
        await page.tracing.start({ path: 'profile.json', screenshots: true})//Me permite empezar, escuchar todos los eventos que se realicen
        await page.goto('https://ualki.com/es')
        await page.tracing.stop()

        const tracing = JSON.parse(fs.readFileSync('./profile.json', 'utf8')) //Extrae data del Profile .json
        //Filtrar el JSON
        const traceScreenShots = tracing.traceEvents.filter( //Se crea una variable donde se va a filtrar
             (x)=> //Generamos la función para mapear el filtro:
            x.cat === 'disabled-by-default-devtools.screenshot' && //accedemos a las propiedades que sean .cat. La propiedad escrita entre '' se escribe tal cual
            x.name === 'Screenshot' &&
            typeof x.args !== 'undefined' &&
            typeof x.args.snapshot !== 'undefined' //Propiedad interna de args        
            
        )
        //Iterar sobre este arreglo para crear las imagenes:

        traceScreenShots.forEach(function(snap, index){
            fs.writeFile(`trace-screeshot-${index}.png`, snap.args.snapshot, 'base64', function(err){//Paso las propiedades que quiero que tengan los archivos cuando vaya iterando el arreglo
            if(err){ //Si se produce un error que mensaje quiero que se muestre por consola
                console.log('No se pudo crear el archivo', err)
            }
        })
    })         

    }, 35000) 
    
    //<<<<<<<<<<<<<<<<<<<<------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>
    //First contentful paint:
    

    test('Medir el performance del first paint y irst contentful paint', async() =>{ 
        const navigationPromise = page.waitForNavigation()
        await page.goto('https://ualki.com/es')
        await navigationPromise

        const firstPaint = JSON.parse(
            await page.evaluate(()=> JSON.stringify(performance.getEntriesByName('first-paint')))
        )

        const firsContentfulPaint = JSON.parse(
            await page.evaluate(()=> JSON.stringify(performance.getEntriesByName('first-contentful-paint')))
        )

        // console.log('firstPaint',firstPaint)
        // console.log('firsContentfulPaint',firsContentfulPaint)

        /*Otra manera de hacerlo: Se pueden hacer spect o asserttions 
        para determinar si se esperan que los tiempos sean muy altos o muy bajos, según los requerimientos de la prueba.*/
        console.log('firstPaint',firstPaint[0].startTime)
        console.log('firsContentfulPaint',firsContentfulPaint[0].startTime)
           

    }, 35000)

    test('Medir el performance de los frames por segundo', async() =>{ 
        
        const devtoolsProtocolClient = await page.target().createCDPSession()
        await devtoolsProtocolClient.send('Overlay.setShowFPSCounter', { show: true })
        await page.goto('https://ualki.com/es')

        await page.screenshot({ path:'framesPorSegundo.jpg', type: 'jpeg' })           

    }, 35000)    


})