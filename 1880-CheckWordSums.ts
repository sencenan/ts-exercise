namespace CheckWordSums1880 {

function isSumEqual(firstWord: string, secondWord: string, targetWord: string): boolean {
    const
        aCode = 'a'.charCodeAt(0),
        fn = (s: string) => parseInt(
            Array.from(s).map(c => c.charCodeAt(0) - aCode).join(''),
            10
        );

    return fn(firstWord) + fn(secondWord) === fn(targetWord);
};

}
