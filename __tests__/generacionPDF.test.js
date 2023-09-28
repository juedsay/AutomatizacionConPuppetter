const puppeteer = require('puppeteer')

describe('Generacion de PDF',()=> { 

    let browser
    let page
    
    beforeAll(async()=>{
        browser = await puppeteer.launch({
            headless: false, 
            defaultViewport: null,
            slowMo: 500
        })
                
        const context = await browser.createIncognitoBrowserContext()
        page = await context.newPage()
        await page.goto('https://ualki.com/es', {waitUntil : 'networkidle0'})

    },100000) 
    
    afterAll(async()=>{
        await browser.close()
    })
    

    test('PDF de pantalla completa', async() =>{ 
        
        let pdfCSS = [] //Creo la variable que va a almacenar los estilos de mi archivos PDF
        pdfCSS.push('<style>')
        pdfCSS.push('h1 { font-size:10px; margin-left:30px;}')
        pdfCSS.push('</style>')
        
        const css = pdfCSS.join('') //Voy a unir los estilos

        await page.pdf({ //Genero el PDF dandole el formato que deseo que tenga
            path: './Ualki.pdf',
            format: 'A4',
            printBackground: true,
            displayHeaderFooter: true,
            headerTemplate: css + '<h1>' + 'PDF de Para generar reporte de Test' + '</h1>',
            footerTemplate: css + '<h1> Page <span class="pageNumber"></span> of <span class="totalPages"></span></h1>',
            margin: {
                top: '10px',
                bottom: '20px',
                right: '30px',
                left: '30px'
            }
                
        })
    })    
        test('PDF de pantalla completa en landscascap', async() =>{ 
        
            let pdfCSS = [] //Creo la variable que va a almacenar los estilos de mi archivos PDF
            pdfCSS.push('<style>')
            pdfCSS.push('h1 { font-size:10px; margin-left:30px;}')
            pdfCSS.push('</style>')
            
            const css = pdfCSS.join('') //Voy a unir los estilos
    
            await page.pdf({ //Genero el PDF dandole el formato que deseo que tenga
                path: './Ualkilandscape.pdf',
                format: 'A4',
                printBackground: true,
                displayHeaderFooter: true,
                headerTemplate: css + '<h1>' + 'PDF de Para generar reporte de Test' + '</h1>',
                footerTemplate: css + '<h1> Page <span class="pageNumber"></span> of <span class="totalPages"></span></h1>',
                margin: {
                    top: '10px',
                    bottom: '20px',
                    right: '30px',
                    left: '30px'
                },
                landscape: true,                    
            })
        
    })    


}, 350000)