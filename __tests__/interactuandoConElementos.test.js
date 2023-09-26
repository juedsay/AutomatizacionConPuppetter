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

        //Click derecho
        await page.click('#authentication > span', { button:'right', delay: 500})
        await page.waitForTimeout(3000)

        //Doble click
        await page.click('#authentication > button', { clickCount: 2, delay: 500})
        await page.waitForTimeout(3000)

        //Voy a la segunda web:
        await page.goto('https://devexpress.github.io/testcafe/example/')
        //Escribir en campo formulario
        await page.type('#developer-name', 'Julian', { delay: 100})
        await page.waitForTimeout(3000)
        
        //Se hace click en los checkbox
        await page.click('#remote-testing')
        await page.click('#tried-test-cafe')
        //Escribir en campo de comentario
        await page.type('#comments', 'Ésto es un comentario')
        //Click en el boton submit del formulario para enviarlo finalmente
        await page.click('#submit-button')
        await page.waitForTimeout(3000)
        
    }, 35000)

})