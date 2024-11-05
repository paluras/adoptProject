import { useTranslation } from "react-i18next";

import InfoBox from "../InfoBox";

interface DetailsContainerProps {
    animalError: boolean;
    infoData: { translationKey: string; value: string | undefined }[];
    medicalHistoryError: boolean;
    medicalInfoData: { translationKey: string; value: string | undefined }[];
}

const DetailsContainer: React.FC<DetailsContainerProps> = ({
    animalError,
    infoData,
    medicalHistoryError,
    medicalInfoData
}) => {
    const { t } = useTranslation();

    return (
        <div className="details-container">
            <h1 className="text-2xl font-bold py-4">{t("animalPage.details")}</h1>
            <div className="grid gap-2 grid-cols-2 w-full">
                {!animalError && infoData.map((info, index) => (
                    <InfoBox
                        key={index}
                        imgUrl="/icons/heart-solid.svg"
                        title={{
                            prefix: t(info.translationKey),
                            value: info.value
                        }}
                    />
                ))}
                {!medicalHistoryError && (
                    medicalInfoData.map((info, index) => (
                        <InfoBox
                            key={index}
                            imgUrl="/icons/heart-solid.svg"
                            title={{
                                prefix: t(info.translationKey),
                                value: info.value
                            }}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default DetailsContainer;