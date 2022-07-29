// https://leetcode.com/problems/find-and-replace-pattern/

var findAndReplacePattern = function(words, pattern) {
    const match = (s, p) => {
        const wordToPattern = {};
        const patternToWord = {};
        
        return [...s].reduce((m, c, pos) => {
            if (wordToPattern[c]) {
                // char in dictionary
                m = m & wordToPattern[c] === p[pos];
            } else {
                // seeing this char for the 1st time
                if (patternToWord[p[pos]]) {
                    // p[pos] already mapped
                    m = false;
                } else {
                    patternToWord[p[pos]] = c;
                    wordToPattern[c] = p[pos];
                }
            }
            
            return m;
        }, true);
    }
    
    return words.filter(w => match(w, pattern));
};
