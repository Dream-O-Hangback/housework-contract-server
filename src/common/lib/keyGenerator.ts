export const keyGenerator = () => {
    let key = '';

    for (let i = 0; i < 10; i++) {
        key += String(Math.floor(Math.random() * 10));
    }
    
    return key;
}