namespace VerifyAlienDictionary953 {

    function isAlienSorted(words: string[], order: string): boolean {
        const
            A = 'a'.charCodeAt(0),
            mapping = Array
                .from(order)
                .reduce((d, c, i) => {
                    d[c] = String.fromCharCode(A + i);
                    return d;
                }, {} as Record<string, string>),
            translate = (s: string) => Array.from(s).map(s => mapping[s]).join(''),
            english = words.map(translate),
            sorted = english.slice(0).sort();

        for (let i = 0; i < sorted.length; i += 1) {
            if (sorted[i] !== english[i]) {
                return false;
            }
        }

        return true;
    };

}
