import { useTranslation } from "react-i18next"

const MyContainer = () => {
  const { t } = useTranslation();
  return (
    <>
        <h2>{t("This is the front page")}</h2>
    </>
  )
}

export default MyContainer