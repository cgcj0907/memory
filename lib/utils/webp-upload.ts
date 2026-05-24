export function toWebpFileName(fileName: string) {
  const normalized = fileName.replace(/\.[^.]+$/, "");
  return `${normalized || fileName}.webp`;
}

export async function convertImageFileToWebp(file: File, quality = 0.9) {
  if (file.type === "image/webp" && /\.webp$/i.test(file.name)) {
    return file;
  }

  const objectUrl = URL.createObjectURL(file);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const nextImage = new Image();

      nextImage.onload = () => resolve(nextImage);
      nextImage.onerror = () => reject(new Error("图片读取失败"));
      nextImage.src = objectUrl;
    });

    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("无法处理图片");
    }

    context.drawImage(image, 0, 0);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (nextBlob) => {
          if (!nextBlob) {
            reject(new Error("WebP 转换失败"));
            return;
          }

          resolve(nextBlob);
        },
        "image/webp",
        quality
      );
    });

    return new File([blob], toWebpFileName(file.name), {
      type: "image/webp",
      lastModified: Date.now()
    });
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}
