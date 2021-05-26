namespace PrimePalindrome {

// const primes: number[] = [2];

const
    MAX = 2 * Math.pow(10, 8),
    isPrime6k = (n: number): boolean => {
        if (n <= 3) {
            return n > 1;
        } else if (n % 2 === 0 || n % 3 === 0) {
            return false
        } else {
            for (let i = 5; Math.pow(i, 2) <= n; i += 6) {
                if (n % i === 0 || n % (i + 2) === 0) {
                    return false;
                }
            }

            return true;
        }
    },
    reverse = (n: number): number => {
        let m = 0;

        for (let i = n; i > 0; i = Math.floor(i / 10)) {
            m = m * 10 + (i - Math.floor(i / 10) * 10);
        }

        return m;
    },
    numDigits = (x: number) => Math.ceil(Math.log(x) / Math.log(10));

function primePalindrome(n: number): number {
    // const
        // isPrime = (n: number): boolean =>  {
        //     if (n <= 1) {
        //         return false;
        //     }

        //     for (let i = 0; i < primes.length && Math.pow(primes[i], 2) <= n; i += 1) {
        //         if (n % primes[i] === 0) {
        //             return false;
        //         }
        //     }

        //     if (primes[primes.length - 1] < n) {
        //         primes.push(n);
        //     }

        //     return true;
        // };

    // for (let i = n; i < 2 * Math.pow(10, 8); i += 1) {
    //     if (reverse(i) === i && isPrime6k(i)) {
    //         return i;
    //     }
    // }

    // for (let i = 1; i < 2 * Math.pow(10, 8); i += 1) {
    //     if (isPrime(i) && i >= n && reverse(i) === i) {
    //         return i;
    //     }
    // }

    for (let root = Math.pow(10, Math.floor(numDigits(n) / 2)); ; root += 1) {
        const
            r = reverse(root),
            pos = Math.pow(10, numDigits(root)),
            p1 = Math.floor(root / 10) * pos + r,
            p2 = root * pos + r;

        if (p1 >= MAX) { break; }

        if (p1 >= n && isPrime6k(p1)) {
            return p1;
        }
        if (p2 >= n && isPrime6k(p2)) {
            return p2;
        }
    }

    return -1;
};

// console.log(primePalindrome(11));
// console.log(primes);
console.log(primePalindrome(13));
console.log(primePalindrome(9965700));
console.log(primePalindrome(45887963));

}
