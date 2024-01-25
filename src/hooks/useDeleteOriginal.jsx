export default async function useDeleteOriginal(id) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/riclae/deleteOriginal/${id}`,
      { method: "DELETE" },
    );
    if (!response.ok) {
      throw new Error();
    }
    return { status: true, message: "Original deleted" };
  } catch (error) {
    return { status: false, message: "Original delete failed" };
  }
}
