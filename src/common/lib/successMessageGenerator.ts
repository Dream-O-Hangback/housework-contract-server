export const successMessageGenerator = (data?: any) => {
    const result = { message: 'success', data: undefined };
    if (data) result.data = data;

    return result;
}
