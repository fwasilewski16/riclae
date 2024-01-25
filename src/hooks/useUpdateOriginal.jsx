export default async function useUpdateOriginal(original) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/riclae/updateOriginal/${
        original._id
      }`,
      {
        method: "PATCH",
        body: JSON.stringify(original),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      throw new Error();
    }
    return { status: true, message: "Original updated successfully" };
  } catch (error) {
    return { status: false, message: "Original update failed" };
  }
}
