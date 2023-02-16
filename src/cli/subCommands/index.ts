export const subCommands = await Promise.all([
  (await import('./search')).command,
])
