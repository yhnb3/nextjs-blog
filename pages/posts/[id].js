import utilStyles from '../../styles/utils.module.css'
import Layout from '../../components/layout'
import Head from 'next/head'
import Date from '../../components/date'
import { getAllPostIds, getPostData, getAllTags } from '../../lib/posts'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Link from 'next/link'

export default function Post({postData, allTags}) {
  return (
	<div>
		<Header></Header>
		<Layout tags={allTags}>
			<Head><title>{postData.title}</title></Head>
			<article>
				<h1 className={utilStyles.headingXl}>{postData.title}</h1>
				<div className={utilStyles.lightText}>
					<Date dateString={postData.date} />
				</div>
				<div>
				{postData.tags.split(' ').map((tag) => (
					<Link key={tag} href={`/tags/${tag}`}>
						<a className={utilStyles.tag} >#{tag}</a>
					</Link>
				))}
				</div>
				<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
			</article>
		</Layout>
		<Footer></Footer>
	</div>
	)
}

export function getStaticPaths() {
	const paths = getAllPostIds()
	return {
		paths,
		fallback: false
	}
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  const allTags = getAllTags()
  return {
    props: {
	  allTags,
      postData
    }
  }
}
 