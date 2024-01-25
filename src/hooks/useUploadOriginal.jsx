export default async function useUploadOriginal(original) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/riclae/uploadOriginal`,
      {
        method: "POST",
        body: JSON.stringify(original),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      throw new Error();
    }
    return { status: true, message: "Original uploaded successfully" };
  } catch (error) {
    return { status: false, message: "Original upload failed" };
  }
}
