import { Command } from '@commander-js/extra-typings'
import { readdir } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const importCommands = async (dirName: string) => {
  try {
    let filePaths: string[] = []
    const files = await readdir(dirName)
    for (const file of files) {
      if (!file.includes('index')) {
        const filePath = path.join(dirName, file)
        // console.log('subCommand file detected', filePath)
        filePaths.push(filePath)
      }
    }

    const imported = await Promise.all(
      filePaths.map(async (path) => {
        const resolve = await import(path)
        return resolve.command as Command
      }),
    )
    return imported
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const subCommands = await importCommands(__dirname)
