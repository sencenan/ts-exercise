var jump = function(nums) {
    const costs = [0];
    
    for (let i = nums.length - 2; i >= 0; i -= 1) {
        let d = Infinity;
        
        for (let j = 0; j < nums[i] && j < costs.length; j += 1) {
            d = Math.min(d, 1 + costs[j]);
        }
        
        costs.unshift(d);
    }
    
    return costs[0];
};
