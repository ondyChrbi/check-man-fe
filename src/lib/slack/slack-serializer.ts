import { Text } from 'slate';
import escapeHTML from 'escape-html'

export const serializeAll = (nodes: any[]) => {
    let string = '';

    nodes.forEach((n) => string += serialize(n));

    return string;
}

const serialize = (node : any) => {
    if (Text.isText(node)) {
        const text = escapeHTML(node.text);

        if (node.bold) {
            return `<strong>${text}</strong>`
        }

        return text;
    }

  const children = node.children.map((n : any) => serialize(n)).join('')

  switch (node.type) {
      case 'quote':
          return `<blockquote><p>${children}</p></blockquote>`
      case 'paragraph':
          return `<p>${children}</p>`
      case 'link':
          return `<a href="${node.url}">${children}</a>`
      default:
          return children
  }
}

export default serialize;