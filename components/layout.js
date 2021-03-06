import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Header from './header'
import Aside from './aside'

export const siteTitle = '강우의 블로그'

export default function Layout(props) {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />
          <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
              siteTitle
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        {props.home ?
        <section className={utilStyles.headingMd}>
            <p>안녕하세요 강우의 블로그 입니다.</p>
        </section>
        : <></>}
        <main>{props.children}</main>
      </div>
      <Aside tags={props.tags}></Aside>
    </div>
  )
}
