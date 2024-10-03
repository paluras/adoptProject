import React from "react";

interface TextContent {
    prefix?: string;
    value?: string | number;
}

interface InfoBoxProps {
    imgUrl: string | undefined;
    title: TextContent;

}

const InfoBox: React.FC<InfoBoxProps> = ({ imgUrl, title }) => {
    return (
        <div className="flex relative flex-col justify-center p-4 py-14 w-full h-auto bg-white rounded-lg ">
            <img src={imgUrl} alt={title.value as string} className="absolute top-4  h-auto w-6 " style={{ color: "#f99595" }} />
            <h1 className="mt-2 text-xl font-bold pb-2">
                {title.prefix && `${title.prefix} `}
            </h1>
            <p>{title.value}</p>
        </div>
    );
};

export default InfoBox;