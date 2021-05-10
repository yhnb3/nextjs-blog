import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'
import Header from '../components/header'

import { getSortedPostsData } from '../lib/posts'

export default function Home({allPostsData}) {
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
            {allPostsData.map(({ id, date, title, tags }) => (
              <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <div>
                {tags.split(' ').map((tag) => (
                  <Link href={`/tags/${tag}`}>
                    <button key={tag}>#{tag}</button>
                  </Link>
                ))}
              </div>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
            ))}
          </ul>
        </section>
      </Layout>
    </div>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
