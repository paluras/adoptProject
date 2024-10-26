
export const appendImages = (formData: FormData, basicInfo: Record<string, unknown>): void => {
    if (Array.isArray(basicInfo.imageFiles) && basicInfo.imageFiles.length > 0) {
        basicInfo.imageFiles.forEach(file => {
            formData.append('images', file);
        });
    } else if (basicInfo.imageUrl) {
        if (Array.isArray(basicInfo.imageUrl)) {
            basicInfo.imageUrl.forEach(url => formData.append('imageUrl', url));
        } else {
            formData.append('imageUrl', basicInfo.imageUrl as string);
        }
    }
};