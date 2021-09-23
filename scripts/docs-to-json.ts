import '@johnlindquist/kit'
import {getDiscussions, Category} from '../src/utils/get-discussions.js'

let run = async () => {
  console.log(`Starting discussion json generation:`)

  console.log({getDiscussions})

  let jsonfile = await npm('jsonfile')
  let docs = await getDiscussions(Category.Docs)
  let outfile = path.resolve(`./public/data/docs.json`)
  await jsonfile.writeFile(outfile, docs)

  console.log(`Docs written to json: ${outfile} 👏`)
}

run()
