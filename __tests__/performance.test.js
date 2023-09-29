const puppeteer = require('puppeteer')
const fs = require('fs')

describe('Performance',()=> { 

    let browser
    let page
   
    beforeAll(async()=>{
        browser = await puppeteer.launch({
            headless: true, 
            defaultViewport: null,
            //slowMo: 500
        })
        
        page = await browser.newPage()
        await page.goto('https://ualki.com/es')
       
        
    },10000)
    afterAll(async()=>{
        await browser.close()
    })
    

    test('Medir el performance de la automatizacion', async() =>{ 
    
        await page.waitForSelector('img')
        const metrics = await page.metrics()
        console.log(metrics)
         

    }, 35000)

    // test('Medir el performance de la pagina', async() =>{ 
    
    //     await page.waitForSelector('img')
    //     const metrics2 = await page.evaluate(()=> JSON.stringify(window.performance)) //Hago que me convierta la cadena de los resultados en un JSON, y accedo a los elemtos del navedor, en éste caso a la ventana
    //     console.log(metrics2)
         

    // }, 35000)

    test('Medir el performance del page load con screeshots', async() =>{ 
    
        await page.tracing.start({ path: 'profile.json ' , screenshots: true})//Me permite empezar, escuchar todos los eventos que se realicen
        await page.goto('https://ualki.com/es')
        await page.waitForSelector('img')
        await page.tracing.stop()
         

    }, 35000)

    test('Medir el performance del page load con screeshots y extrayendolos', async() =>{ 
    
        await page.tracing.start({ path: 'profile.json ' , screenshots: true})//Me permite empezar, escuchar todos los eventos que se realicen
        await page.goto('https://ualki.com/es')
        await page.waitForSelector('img')
        await page.tracing.stop()

        const tracing = JSON.parse(fs.readFileSync('../profile.json', 'utf8')) //Extrae data del Profile .json
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
            fs.writeFile(`trace-screeshot-${index}.png`,snap.args.snapshot, 'base64', funtion(err))//Paso las propiedades que quiero que tengan los archivos cuando vaya iterando el arreglo
            if(err){ //Si se produce un error que mensaje quiero que se muestre por consola
                console.log('No se pudo crear el archivo', err)
            }
        })
         

    }, 35000)




    


})