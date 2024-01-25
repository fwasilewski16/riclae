export default async function useUploadImage(image) {
  async function uploadImage(image) {
    const formData = new FormData();
    formData.append("newImage", image);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/riclae/uploadImage`,
        {
          method: "POST",
          body: formData,
        },
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      return { status: true, link: data.link };
    } catch (error) {
      return { status: false };
    }
  }
  return uploadImage(image);
}
