import styles from './layout.module.css'
import Link from 'next/link'

export default function headers() {
    return (
        <div className={styles.header}>
            <span className={styles.headerChild}>
                <Link href="/">
                    <a>강우의 기록</a>
                </Link>
            </span>
            <span className={styles.headerChild}>search</span>
        </div>
    )
}