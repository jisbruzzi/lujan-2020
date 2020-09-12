import personasReal from './personas.json'
const personas:Array<string> = personasReal
function persona (n:number, seed:string):string {
  let seedTotal = 0
  for (let index = 0; index < seed.length; index++) {
    seedTotal += seed.charCodeAt(index)
  }
  const nDefinitivo = (seedTotal + n) % personas.length
  return personas[nDefinitivo]
}
function formatear (texto:string, miNombre:string):string {
  console.log(texto)
  return texto
    .replace('{{p1}}', persona(1, miNombre))
    .replace('{{p2}}', persona(2, miNombre))
    .replace('{{p3}}', persona(3, miNombre))
    .replace('{{p4}}', persona(4, miNombre))
    .replace('{{nombre}}', miNombre)
}

export { formatear }
