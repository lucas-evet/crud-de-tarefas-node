import { parse } from 'csv-parse'
import fs from 'node:fs'

const csvPath = new URL('../tasks.csv', import.meta.url)

const stream = fs.createReadStream(csvPath)

const csvParse = parse({
  delimiter: ',',
  skip_empy_Lines: true,
  from_lime: 2
})

async function execute() {

    const lineParse = stream.pipe(csvParse)

    console.log('Iniciando importação...')

    for await (const line of lineParse) {
        const [title, description] = line

        await fetch('http:/localhost:3333/tasks',{
            method: 'POST',
            body: JSON.stringify({
                title,
                description
            }),
            headers: {
                'Content-Type': 'application/json',
            }

        })

        console.log(` Importado: ${title}`)
    }

    console.log('Importação finalizada!')
}

execute()