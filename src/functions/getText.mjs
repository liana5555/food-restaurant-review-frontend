
 export default function getText (html)  {
        const doc = new DOMParser().parseFromString(html, 'text/html')
        return doc.body.textContent
    }

