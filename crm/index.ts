import type { AttributesTypes } from './attributes'
import { attributes } from './attributes'
import { brevoGet, brevoCreate, brevoUpdate, brevoDelete } from './api'

type Operations = 'read' | 'update' | 'create' | 'update' | 'delete' | string

type Elements = 'attributes' | 'contacts' | string

async function brevo(
  operation: Operations = process.argv[2],
  type: Elements = process.argv[3],
  name: string = process.argv[4]
) {
  let element: object
  let path: string
  switch (operation) {
    case 'get':
      path = 'contacts'
      element = await brevoGet({ path })
      break
    case 'create':
      if (name === 'all') {
        return Object.entries(attributes).forEach(
          ([identifier, body]: [string, AttributesTypes]) => {
            brevoCreate({
              path: `contacts/attributes/${body.type === 'category' ? 'category' : 'normal'}`,
              identifier,
              body,
            })
          }
        )
      }
      const attribute = attributes[name]
      if (!attribute) return console.error(`No attribute with name: ${name}`)
      path = `contacts/attributes/${attribute.type === 'category' ? 'category' : 'normal'}`
      element = await brevoCreate({ path, identifier: name, body: attribute })
      if (element) {
        return console.log(element)
      }
      break
    case 'delete':
      if (type === 'attributes') {
        if (!name) {
          path = 'contacts/attributes'
          const res = await brevoGet({ path })
          res.attributes.forEach(
            (attribute: { name: string; category: string; type: string }) =>
              brevoDelete({
                path: path,
                identifier: attribute.category,
                name: attribute.name,
              })
          )
        }
        return
      } else {
        return await brevoDelete({
          path: 'contacts/attributes/normal',
          identifier: name,
        })
      }
  }
}

brevo()
