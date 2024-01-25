export default async function useUploadPrint(print) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/riclae/uploadPrint`,
      {
        method: "POST",
        body: JSON.stringify(print),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    return { status: true, message: "Print uploaded successfully" };
  } catch (error) {
    return { status: false, message: "Print upload failed" };
  }
}
