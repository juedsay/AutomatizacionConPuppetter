const puppeteer = require('puppeteer')

describe('Tipos de Espera',()=> { //Función que recibe un callback

        //<<<<<<<<<<<<<<------------------------------------------------->>>>>>>>>>>>>>>//
        //Configuración del Timeout:
        jest.setTimeout(10000)
        //-------------------------------------------------//

    it('Mostrar todos los diferentes tipos de espera', async() =>{ //Es una función asincrona porque necesito esperar a que se abra el navegador       

        const browser = await puppeteer.launch({
            headless: true, //Si está en falso SI se puede ver el navegador, si está en verdadero NO se puede ver el Navegador
            defaultViewport: null,//Hace que la web tome el tamaño de la ventana
            //slowMo: 500
        })
        const page = await browser.newPage()
        //<<<<<<<<<<<<<<------------------------------------------------->>>>>>>>>>>>>>>//
        //Configuración de otros tipo de Timeout:
        page.setDefaultTimeout(10000)
        page.setDefaultNavigationTimeout(10000)//Es para cuando esté navegando entre páginas qué tanto debo esperar para a que la navegación termine
        //<<<<<<<<<<<<<<------------------------------------------------->>>>>>>>>>>>>>>//
        //Espera que termine de cargar el logo de la pestaña
        // await page.goto('https://www.github.com', {waitUntil : 'networkidle0'})

        //Espera explicita
        // await page.waitForTimeout(5000) //No es muy recomendable usar

        //Espera por un CSS selector
        // await page.waitForSelector('body > div.logged-out.env-production.page-responsive.header-overlay.home-campaign > div.position-relative.js-header-wrapper > header > div > div.d-flex.flex-justify-between.flex-items-center.width-full.width-lg-auto > a > svg')

        //Espera por un Xpath
        // await page.waitForXPath('/html/body/div[1]/div[1]/header/div/div[1]/a/svg/path')

        await page.goto('https://demoqa.com/modal-dialogs', {waitUntil : 'networkidle2'})
        await page.waitForSelector('#showSmallModal' ,{ visible: true })

        //El click solamente puede recibir un Selector de tipo CSS, entonces tengo que crear una Variable, y luego la implemento para llamar al método click:
        const button = await page.waitForXPath('//*[@id="showSmallModal"]')
        await button.click()

        //----------------------------------------------------------------------------------------------------------------//
        //----------------------------------------------------------------------------------------------------------------//
        //----------------------------------------------------------------------------------------------------------------//
        
        //Espera por Funciones:
        
        // await page.waitForFunction(()=> document.querySelector('#example-modal-sizes-title-sm').innerText === 'Small Modal')
        
        //Ejemplo para observar el viewport:
        // const observaResize = page.waitForFunction('windows.innerWidth < 100')
        // await page.setViewport({ width: 50, height: 50 })

        // await observaResize

        //Para cerrar el Modal:
        await page.click('#closeSmallModal')
        //Ahora lo niego, o sea me tiene que regresar un False, la modificación es el "!" delante de document
        await page.waitForFunction(()=> !document.querySelector('#example-modal-sizes-title-sm'), 
        { timeout: 30000} )//<<<<<AQUI APLICO OTRO TIPO DE TIMEOUT >>>>//

        await browser.close()    
        
    }, 35000)//<<<<<<<<<<<<<<--ESTE ES OTRO TIPO DE TIMEOUT MAS COMODO DE CONFIGURAR--->>>>>>>>>>>>>>>//

})