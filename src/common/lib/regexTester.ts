export const testPasswordRegex = (password: string) => {
    const passwordRegex = new RegExp('^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$'); // 최소 8자, 최대 32자, 최소 하나의 문자 및 하나의 숫자
    
    return passwordRegex.test(password);
}
