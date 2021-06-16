namespace textJustification68 {

    function fullJustify(words: string[], maxWidth: number): string[] {
        const distributeSpace = (ns: number, words: string[]): string => {
            const len = words.length - 1;

            if (len < 1) {
                return words.join('') + new Array(ns).fill(' ').join('');
            } else {
                const
                    q = Math.floor(ns / len),
                    r = ns - q * len;

                let ans = '';

                for (let i = 0; i < len; i += 1) {
                    ans += words[i] + new Array(q + (i < r ? 1 : 0)).fill(' ').join('');
                }

                return ans + words[len];
            }
        };

        const lines: string[] = [];

        let
            buf: string[] = [],
            lineSize = 0;

        while (words.length > 0) {
            const head = words.shift() as string;

            if (lineSize + head.length + buf.length > maxWidth) {
                // can no longer fit in the line
                lines.push(distributeSpace(maxWidth - lineSize, buf));
                lineSize = 0;
                buf = [];
            }

            lineSize += head.length;
            buf.push(head);
        }

        if (buf.length) {
            lines.push(buf.join(' ') + new Array(maxWidth - lineSize - (buf.length - 1)).fill(' ').join(''));
        } else {
            const pre: string = lines[lines.length - 1].split(' ').filter(x => x).join(' ');
            lines[lines.length - 1] = pre + new Array(maxWidth - pre.length).fill(' ').join('');
        }

        return lines;
    }

}
