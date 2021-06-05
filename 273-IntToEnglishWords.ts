namespace IntToEnglishWords273 {

const
    TEN = 10,
    HUNDRED = Math.pow(10, 2),
    THOUSAND = Math.pow(10, 3),
    MILLION = Math.pow(10, 6),
    BILLION = Math.pow(10, 9),
    MAP_1_19 = [
        'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven',
        'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen',
        'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen',
        'Nineteen'
    ],
    TENS = [
        "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty",
        "Ninety"
    ],
    encode = (num: number): string => {
        num = Math.floor(num);

        if (num === 0) {
            return '';
        }

        if (num < 20) {
            return MAP_1_19[num - 1];
        }

        if (num < HUNDRED) {
            return [
                TENS[Math.floor(num / TEN) - 2],
                encode(num % TEN)
            ].join(' ').trim();
        }

        if (num < THOUSAND) {
            return [
                encode(num / HUNDRED),
                'Hundred',
                encode(num % HUNDRED)
            ].join(' ').trim();
        }

        if (num < MILLION) {
            return [
                encode(num / THOUSAND),
                'Thousand',
                encode(num % THOUSAND)
            ].join(' ').trim();
        }

        if (num < BILLION) {
            return [
                encode(num / MILLION),
                'Million',
                encode(num % MILLION)
            ].join(' ').trim();
        }

        return [
            encode(num / BILLION),
            'Billion',
            encode(num % BILLION)
        ].join(' ').trim();
    };

function numberToWords(num: number): string {
    return num === 0 ? 'Zero' : encode(num);
};

const f = (x: number) => console.log(numberToWords(x));

f(1234567891);
f(2147483647);
f(976);
f(909);
f(930);
f(111);
f(101);
f(199);
f(99);
f(30);
f(3);
f(15);
f(0);

}
