const puppeteer = require('puppeteer')
const fs = require('fs')

describe('Probando el performance', () => {
	let browser
	let page

	beforeAll(async () => {
		browser = await puppeteer.launch({
			headless: false,
			defaultViewport: null,
		})
		page = await browser.newPage()
	})

	afterAll(async () => {
		await browser.close()
	})

	it('Debera medir el perfomance de la automatizacion', async () => {
		// The page.metrics() returns runtime metrics from the Chrome DevTools Protocol
		//Performance.getMetrics() method, such as layout duration, recalc-style durations and JS event listeners.
		await page.goto('https://platzi.com')
		await page.waitForSelector('img')
		const metrics = await page.metrics()
		console.log(metrics)
	}, 15000)

	it('Debera medir el perfomance de la pagina', async () => {
		await page.goto('https://platzi.com')
		await page.waitForSelector('img')
		const metrics2 = await page.evaluate(() => JSON.stringify(window.performance))
		console.log(JSON.parse(metrics2))
	}, 15000)

	it('Debera medir el perfomance del page load', async () => {
		await page.tracing.start({ path: 'profile.json' })
		await page.goto('https://platzi.com')
		await page.tracing.stop()
	}, 15000)

	it('Debera medir el perfomance del page load con screenshots', async () => {
		await page.tracing.start({ path: 'profile.json', screenshots: true })
		await page.goto('https://platzi.com')
		await page.tracing.stop()
	}, 15000)

	it('Debera medir el perfomance del page load con screenshots', async () => {
		await page.tracing.start({ path: 'profile.json', screenshots: true })
		await page.goto('https://platzi.com')
		await page.tracing.stop()

		//Extraer la data del Profile .json
		const tracing = JSON.parse(fs.readFileSync('./profile.json', 'utf8'))
		//Filtramos las imagenes del .json
		const traceScreenShots = tracing.traceEvents.filter(
			(x) =>
				x.cat === 'disabled-by-default-devtools.screenshot' &&
				x.name === 'Screenshot' &&
				typeof x.args !== 'undefined' &&
				typeof x.args.snapshot !== 'undefined'
		)
		//creamos las imagenes

		traceScreenShots.forEach(function (snap, index) {
			fs.writeFile(`trace-screenshot-${index}.png`, snap.args.snapshot, 'base64', function (err) {
				if (err) {
					console.log('writeFile error', err)
				}
			})
		})
	}, 15000)

	it('Debera medir el perfomance del First paint y First contentful paint ', async () => {
		// La primera métrica Contentful Paint (FCP) mide el tiempo desde que una página
		// comienza a cargarse hasta que cualquier parte del contenido de la página se representa en la pantalla.

		//Referencia https://developer.mozilla.org/en-US/docs/Web/API/Performance_Timeline
		const navigationPromise = page.waitForNavigation()
		await page.goto('https://platzi.com')

		await navigationPromise

		let firstPaint = JSON.parse(
			await page.evaluate(() => JSON.stringify(performance.getEntriesByName('first-paint')))
		)

		let firstContentfulPaint = JSON.parse(
			await page.evaluate(() =>
				JSON.stringify(performance.getEntriesByName('first-contentful-paint'))
			)
		)

		console.log(`First paint: ${firstPaint[0].startTime}`)
		console.log(`First paint: ${firstContentfulPaint[0].startTime}`)
	}, 15000)

	it('Debera medir el perfomance de frames por segundo', async () => {
		const devtoolsProtocolClient = await page.target().createCDPSession()
		await devtoolsProtocolClient.send('Overlay.setShowFPSCounter', { show: true })
		await page.goto('https://platzi.com')
		await page.screenshot({ path: 'framesPorSegundo.jpg', type: 'jpeg' })
		await page.close()
	}, 15000)
})