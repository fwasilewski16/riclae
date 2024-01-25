export default async function useDeletePrint(id) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/riclae/deletePrint/${id}`,
      { method: "DELETE" },
    );
    if (!response.ok) {
      throw new Error();
    }
    return { status: true, message: "Print deleted" };
  } catch (error) {
    return { status: false, message: "Print delete failed" };
  }
}
