import Link from 'next/link'
import styles from './layout.module.css'
export default function Aside(props) {
  return (
    <div className={styles.aside}>
      <h4>Tags</h4>
      <div className={styles.tagList}>
        {props.tags.map((params) => (
          <Link key={params.params.tag} href={`/tags/${params.params.tag}`}>
            <a className={styles.tags} >#{params.params.tag}</a>
          </Link>
        ))}
      </div>
    </div>
  )
}