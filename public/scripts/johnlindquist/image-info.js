// Menu: Image Metadata
// Description: Show the metadata of an image
// Author: John Lindquist
// Twitter: @johnlindquist

let {default: sharp} = await npm('sharp')

let image = await arg('Search an image:', {
  choices: async (input = '') => {
    if (input.length < 3) return []
    let files = await fileSearch(input, {kind: 'image'})

    return files.map((path) => {
      return {
        name: path.split('/').pop(),
        value: path,
        info: path,
      }
    })
  },
})

let {width, height} = await sharp(image).metadata()

show({width, height})