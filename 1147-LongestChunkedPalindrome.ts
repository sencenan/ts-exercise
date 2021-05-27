namespace LongestChunkedPalindrome {

function longestDecomposition(text: string): number {
    let
        prefix = '',
        suffix = '',
        sum = 0;

    while (text.length > 1) {
        prefix = prefix + text[0],
        suffix = text[text.length - 1] + suffix;

        text = text.substring(1, text.length - 1);

        if (prefix === suffix) {
            sum += 2;
            prefix = '';
            suffix = '';
        }
    }

    if (prefix != suffix) {
        sum += 1;
    } else if (prefix.length > 0) {
        if (text.length === 1) {
            sum += 3;
        } else {
            sum += 2;
        }
    } else {
        if (text.length === 1) {
            sum += 1;
        }
    }

    return sum;
};

console.log(longestDecomposition('ghiabcdefhelloadamhelloabcdefghi')); // 7
console.log(longestDecomposition('merchant')); // 1
console.log(longestDecomposition('antaprezatepzapreanta')); // 1
console.log(longestDecomposition('a'));
console.log(longestDecomposition('aaa'));
console.log(longestDecomposition('aaaa'));
console.log(longestDecomposition('aaaaa'));
console.log(longestDecomposition('aaaaaa'));
console.log(longestDecomposition('elvtoelvto')); // 2
console.log(longestDecomposition("ssoynekoyypxelchxuwiuegutuggnhxbuiehfjkncqpmhwjftytyfmhwjpkncquiehfjbxuggnhegutiuhxuwpxelcyynekoysso")); //36

}
