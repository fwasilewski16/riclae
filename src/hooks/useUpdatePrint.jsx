export default async function useUpdatePrint(print) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/riclae/updatePrint/${print._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(print),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      throw new Error();
    }
    return { status: true, message: "Print updated successfully" };
  } catch (error) {
    return { status: false, message: "Print update failed" };
  }
}
