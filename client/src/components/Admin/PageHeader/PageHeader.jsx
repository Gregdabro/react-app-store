import styles from './PageHeader.module.scss'
import TitlePageWrapper from './TitlePageWrapper'
import SubTitlePage from './SubTitlePage'
import TitlePage from './TitlePage'
import BackButton from '../../UI/BackButton/BackButton'
const PageHeader = ({ title, subTitle, isBackButton }) => {
  return (
    <div className={styles.pageHeader}>
      <TitlePageWrapper>
        {isBackButton && <BackButton>Go back</BackButton>}
        <SubTitlePage>{subTitle}</SubTitlePage>
        <TitlePage>{title}</TitlePage>
      </TitlePageWrapper>
    </div>
  )
}

export default PageHeader
