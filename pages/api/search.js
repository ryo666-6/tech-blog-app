// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default function handler(req, res) {
  let posts 
  if(process.env.NODE_ENV === 'production') {

  } else {
    const files = fs.readdirSync(path.join('posts'))
    posts = files.map(filename => {
      const slug = filename.replace('.md', '')
      const markdownWithMeta = fs.readFileSync(path.join('posts',filename), 'utf-8')
      const {data:frontmatter} = matter(markdownWithMeta)

      return {
        frontmatter,
        slug
      }
    })
  }

  const results = posts.filter(({frontmatter:{title, excerpt, category}}) => title.toLowerCase().indexOf(req.query.q) != -1 || excerpt.toLowerCase().indexOf(req.query.q) != -1 || category.toLowerCase().indexOf(req.query.q) != -1)
  
  res.status(200).json(JSON.stringify({results}))
}
