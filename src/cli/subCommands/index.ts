export const subCommands = await Promise.all([
  import('./iteration.js').then(({ command }) => command),
  import('./search.js').then(({ command }) => command),
])
