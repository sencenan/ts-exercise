// https://leetcode.com/problems/path-sum-ii/

var pathSum = function(root, targetSum) {
    const res = [];
    
    const visit = (node, sum = 0, path = []) => {
        sum += node.val;
        path = path.concat([node.val]);
        
        if (!node.left && !node.right) {
            // is leaf
            if (sum === targetSum) {
                res.push(path);
            }
        } else {
            node.left && visit(node.left, sum, path);
            node.right && visit(node.right, sum, path);
        }
    };
    
    root && visit(root);
    return res;
};
