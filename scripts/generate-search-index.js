const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const postsDir = path.resolve(__dirname, '../docs/_posts')
const outDir = path.resolve(__dirname, '../docs/.vuepress/public')
const outFile = path.join(outDir, 'search.json')

function stripMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]*)\]\(.*?\)/g, '$1')
    .replace(/[#*_~>`\-|]/g, ' ')
    .replace(/\n{2,}/g, '\n')
    .trim()
}

function readDir(dir) {
  const results = []
  const items = fs.readdirSync(dir, { withFileTypes: true })
  for (const item of items) {
    if (item.isFile() && item.name.endsWith('.md')) {
      const filePath = path.join(dir, item.name)
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(raw)
      const date = data.date
      let year, month, day
      if (date instanceof Date) {
        year = date.getFullYear()
        month = String(date.getMonth() + 1).padStart(2, '0')
        day = String(date.getDate()).padStart(2, '0')
      } else if (typeof date === 'string' && date.length >= 10) {
        year = date.slice(0, 4)
        month = date.slice(5, 7)
        day = date.slice(8, 10)
      }

      const match = item.name.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/)
      const slug = match ? match[1] : item.name.replace(/\.md$/, '')
      const p = year && month && day ? `/${year}/${month}/${day}/${slug}/` : `/${slug}/`

      const plainText = stripMarkdown(
        content.replace(/<!--\s*more\s*-->[\s\S]*/i, '').trim()
      ).slice(0, 500)

      results.push({
        path: p,
        title: data.title || slug,
        date: year ? `${year}-${month}-${day}` : '',
        tags: Array.isArray(data.tags) ? data.tags : [],
        content: plainText,
      })
    }
  }
  return results
}

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
const index = readDir(postsDir)
fs.writeFileSync(outFile, JSON.stringify(index), 'utf-8')
console.log(`Search index generated: ${index.length} posts -> ${outFile}`)
