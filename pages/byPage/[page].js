import Head from 'next/head'
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import Link from 'next/link'
import Date from '../../components/date'
import Header from '../../components/header'

import { getPageNumber, getSortedPostsData, dataDividedByPage } from '../../lib/posts'

export default function Home({paginatedPosts, page}) {
  const pagination = () => {
    if (page === 1){
      return (
        <div>
          <a className={utilStyles.isDisable} href={`/byPage/${page-1}`}>
            이전
          </a>
          <a href={`/byPage/${page+1}`}>
            다음
          </a>
        </div> 
      )
    } else if (page === paginatedPosts.length) {
      return (
        <div>
          <a href={`/byPage/${page-1}`}>
            이전
          </a>
          <a className={utilStyles.isDisable} href={`/byPage/${page+1}`}>
            다음
          </a>
        </div> 
      )
    } else {
      return (
        <div>
          <a href={`/byPage/${page-1}`}>
            이전
          </a>
          <a className={utilStyles.isDisable} href={`/byPage/${page+1}`}>
            다음
          </a>
        </div> 
      )
    }
  }
  return (
    <div>
      <Header></Header>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p>안녕하세요 강우의 블로그 입니다.</p>
        </section>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Recent post</h2>
          <ul className={utilStyles.list}>
            {paginatedPosts[page-1].map(({ id, date, title, tags }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>
                  <a className={utilStyles.title}>{title}</a>
                </Link>
                <br/>
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
                <div>
                  {tags.split(' ').map((tag) => (
                    <Link key={tag} href={`/tags/${tag}`}>
                      <a className={utilStyles.tag} key={tag}>#{tag}</a>
                    </Link>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </section>
        {pagination()}
      </Layout>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = getPageNumber()
  return {
    paths,
    fallback: false
}
}

export async function getStaticProps({ params }) {
  const allPostsData = getSortedPostsData()
  const paginatedPosts = dataDividedByPage(allPostsData)
  return {
    props: {
      page : parseInt(params.page),
      paginatedPosts
    }
  }
}