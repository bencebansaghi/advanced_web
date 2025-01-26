import { useTranslation } from "react-i18next"

const MyContainer = () => {
  const { t } = useTranslation();
  return (
    <>
        <h2>{t("Front intro")}</h2>
    </>
  )
}

export default MyContainer