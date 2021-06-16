import styles from './layout.module.css'
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

export default function Pagination(props) {
  const buttons = (currentPage, lastPage) => {
    let btnArr = []
    let startPage = 1
    let endPage = lastPage
    for(let i=currentPage-1;i<=lastPage;i++) {
      if (i >= 1) {
        startPage = i
        break
      }
    }
    for (let i=currentPage+1;i>=1;i--) {
      if (i <= lastPage) {
        endPage = i
        break
      }
    }
    for(let i=startPage;i<=endPage;i++) {
      btnArr.push(i)  
    }
    if (btnArr[0] !== 1) {
      btnArr.unshift(1,"dot")
    }
    if (btnArr[btnArr.length -1] !== lastPage) {
      btnArr.push("dot", lastPage)
    }
    return btnArr
  }
  const preBtn = (currentPage) => {
    if (currentPage === 1) {
      return <a className={styles.isDisableBtn}><AiOutlineLeft/></a>
    } else {
      return <a href={`/byPage/${currentPage-1}`} className={styles.pageBtn}><AiOutlineLeft/></a>
    }
  }
  const nextBtn = (currentPage, lastPage) => {
    if (currentPage === lastPage) {
      return <a className={styles.isDisableBtn}><AiOutlineRight/></a>
    } else {
      return <a href={`/byPage/${currentPage+1}`} className={styles.pageBtn}><AiOutlineRight/></a>
    }
  }
  return (
    <div >
      <div className={styles.pagenation}>
        {preBtn(props.currentPage)}
        {buttons(props.currentPage, props.lastPage).map((page) => {
          if (page !== "dot") {
            if (page === props.currentPage) {
              return <a key={page} className={styles.currentPage}>{page}</a>
            } else {
              return <a  key={page} href={`/byPage/${page}`} className={styles.pageBtn}>{page}</a>
            }
          } else {          
            return <span key={page}>...</span>
          }
        })}   
        {nextBtn(props.currentPage, props.lastPage)}
      </div>
    </div>
  )

}
