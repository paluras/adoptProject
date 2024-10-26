import InfoBox from "../InfoBox";

interface DetailsContainerProps {
    animalError: boolean;
    infoData: { prefix: string; value: string | undefined }[];
    medicalHistoryError: boolean;
    medicalInfoData: { prefix: string; value: string | undefined }[];
}

const DetailsContainer: React.FC<DetailsContainerProps> = ({ animalError, infoData, medicalHistoryError, medicalInfoData }) => {
    return (
        <div className="details-container">
            <h1 className="text-2xl font-bold py-4">Detali</h1>
            <div className="grid gap-2 grid-cols-2 w-full">

                {!animalError && infoData.map((info, index) => (
                    <InfoBox
                        key={index}
                        imgUrl="/icons/heart-solid.svg"
                        title={{ prefix: info.prefix, value: info.value }}
                    />
                ))}
                {!medicalHistoryError && (
                    medicalInfoData.map((info, index) => (
                        <InfoBox
                            key={index}
                            imgUrl="/icons/heart-solid.svg"
                            title={{ prefix: info.prefix, value: info.value }}
                        />
                    ))
                )}

            </div>
        </div>
    )
}

export default DetailsContainer
