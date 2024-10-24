import MDEditor from "@uiw/react-md-editor";
import React from "react";
import rehypeSanitize from "rehype-sanitize";

interface DescriptionProps {
    name?: string;
    description?: string;
}

const Description: React.FC<DescriptionProps> = ({ name, description }) => {
    return (
        <div data-color-mode="light">
            <h1 className="py-4 text-2xl font-bold">{name}</h1>
            <MDEditor.Markdown
                source={description}
                style={{
                    whiteSpace: 'pre-wrap',
                    color: "#232f61",
                    backgroundColor: '#f6f3e9'
                }}
                rehypePlugins={[rehypeSanitize]}
            />
        </div>
    )
}

export default Description