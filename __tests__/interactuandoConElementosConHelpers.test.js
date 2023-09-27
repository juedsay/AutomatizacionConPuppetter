const puppeteer = require('puppeteer')
const {click,doubleClick,type} = require ('../lib/helpers.js')//Importo librería de Helpers

describe('Interactuando con elementos',()=> { 

    it('Debe abrir y cerrar el navegador', async() =>{ 
        const browser = await puppeteer.launch({
            headless: false, 
            defaultViewport: null,

        })
        const page = await browser.newPage()
        await page.goto('https://demo.guru99.com/test/simple_context_menu.html')
        
        //Hago un callback para cuando me aparezca una alerta, ya que no puedo acceder desde el DOM
        page.on('dialog',async(dialog)=>{
            await dialog.accept()
        })

        //Click derecho
        await click(page, '#authentication > span', { button:'right', delay: 500})
        await page.waitForTimeout(3000)

        //Doble click
        await doubleClick(page,'#authentication > button')
        await page.waitForTimeout(3000)

        //Voy a la segunda web:
        await page.goto('https://devexpress.github.io/testcafe/example/')
        //Escribir en campo formulario
        await type(page, '#developer-name', 'Julian', { delay: 100})
        await page.waitForTimeout(3000)
        
        //Se hace click en los checkbox
        await click(page, '#remote-testing')
        await click(page, '#tried-test-cafe')
        //Escribir en campo de comentario
        await type(page, '#comments', 'Ésto es un comentario')
        //Click en el boton submit del formulario para enviarlo finalmente
        await click(page, '#submit-button')
        await page.waitForTimeout(3000)
        
    }, 350000)

})