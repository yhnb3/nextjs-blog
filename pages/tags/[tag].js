import {getAllTags, getTagPost} from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'
import Link from 'next/link'
import Layout from '../../components/layout'
import Date from '../../components/date'
import Head from 'next/head'
import Header from '../../components/header'

export default function tags({tagPosts, tag, allTags}) {
    return (
      <>      
      <Header></Header>
      <Layout tags={allTags}>
        <Head><title>{tag.name}</title></Head>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>{tag.name}</h2>
          <ul className={utilStyles.list}>
            {tagPosts.map(({ id, date, title, tags }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>
                  <a className={utilStyles.title}>{title}</a>
                </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
              <div>
                {tags.split(' ').map((tag) => (
                  <Link key={tag} href={`/tags/${tag}`}>
                    <a className={utilStyles.tag} >#{tag}</a>
                  </Link>
                ))}
              </div>
            </li>
            ))}
          </ul>
        </section>
      </Layout>
      </>
    )
}

export function getStaticPaths() {
	const paths = getAllTags()
	return {
		paths,
		fallback: false
	}
}

export function getStaticProps({ params }) {
  const tagPosts = getTagPost(params.tag)
  const allTags = getAllTags()
  return {
    props: {
      allTags,
      tag: {name: params.tag},
      tagPosts
    }
  }
}
 