export const ReturnRateInteger = (num: number): string => {
    if (num % 1 === 0) {
        return `${num}.0`
    } else {
        return String(num)
    }
};
