import personasReal from './personas.json'
import bienaventuranzas from './bienaventuranzas.json'
const personas:Array<string> = personasReal
function seedeado<T> (a:Array<T>, seed:string, offset = 0):T {
  let seedTotal = 0
  for (let index = 0; index < seed.length; index++) {
    seedTotal += seed.charCodeAt(index)
  }
  const nDefinitivo = (seedTotal + offset) % a.length
  return a[nDefinitivo]
}
function bienaventuranza (seed:string):string {
  return seedeado(bienaventuranzas, seed, 0)
}
function persona (n:number, seed:string):string {
  return seedeado(personas, seed, n)
}
function formatear (texto:string, miNombre:string):string {
  const r = new RegExp('{{p([0-9]+)}}', 'g')
  let match:RegExpExecArray|null = null
  let result = texto
  while ((match = r.exec(texto)) != null) {
    const n:number = parseInt(match[1])
    result = result.replace(`{{p${n}}}`, persona(n, miNombre))
  }
  console.log(texto)
  return result
    .replace(/{{nombre}}/g, miNombre)
    .replace(/{{bienaventuranza}}/g, bienaventuranza(miNombre))
}
function ampollado (nombre:string) {
  return seedeado([true, false], nombre)
}
export { formatear, ampollado }
