const puppeteer = require('puppeteer')

describe('Interactuando con elementos',()=> { //Función que recibe un callback

    it('Debe abrir y cerrar el navegador', async() =>{ //Es una función asincrona porque necesito esperar a que se abra el navegador
        const browser = await puppeteer.launch({
            headless: false, //Si está en falso SI se puede ver el navegador, si está en verdadero NO se puede ver el Navegador
            defaultViewport: null,//Hace que la web tome el tamaño de la ventana

        })
        const page = await browser.newPage()
        await page.goto('https://demo.guru99.com/test/simple_context_menu.html')
        
        //Hago un callback para cuando me aparezca una alerta, ya que no puedo acceder desde el DOM
        page.on('dialog',async(dialog)=>{
            await dialog.accept()
        })

    
        
    }, 35000)

})