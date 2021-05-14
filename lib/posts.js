import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}
export function getPageNumber() {
  const fileNames = fs.readdirSync(postsDirectory)
  const maxPageNum = parseInt(fileNames.length/5) + 1
  return [...Array(maxPageNum)].map((_, idx) => {
    return {
      params: {
        page: `${idx+1}`
      }
    }
  })
}

export function dataDividedByPage(postData){
  let allData = []
  let dataInPage = []
  for (let post of postData) {
    if (dataInPage.length === 5) {
      allData.push([...dataInPage])
      dataInPage = []
    }
    dataInPage.push(post)
  }
  allData.push([...dataInPage])
  return allData
}

export function getAllTags() {
  const tagSet = new Set()

  const fileNames = fs.readdirSync(postsDirectory)
  fileNames.map(fileName => {
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    matterResult.data.tags.split(' ').map((tag) => {
      tagSet.add(tag)
    })
  })
  let tags = []
  tagSet.forEach(value => {
    tags.push(
      {params:{tag:value}}
    )
  })
  return tags
}

export function getTagPost(tag) {
  const fileNames = fs.readdirSync(postsDirectory)
  let tagPosts = []
  fileNames.map(fileName => {
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    if (matterResult.data.tags.indexOf(tag) !== - 1) {
      tagPosts.push({
        id: fileName.replace(/\.md$/, ''),
        ...matterResult.data
      })
    }
  })
  return tagPosts
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}