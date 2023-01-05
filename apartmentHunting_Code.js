function apartmentHunting(blocks, reqs) {
    const n = blocks.length;

    //Initialize an array currentHavingRequirements to track whether each requirement is present at the current block.
    currentHavingRequirements = []
    for(let req of reqs){
        currentHavingRequirements.push(false);
    }
    for(let i=0;i<n;i++){
        for(let j=0;j<reqs.length;j++){
            currentHavingRequirements[j] =  blocks[i][reqs[j]]||false ? true : currentHavingRequirements[j]
        }
    }

    // Initialize an array presentReqs to store the requirements that are present in at least one block.
    // Iterate through currentHavingRequirements and add the corresponding requirement to presentReqs if it is true.
    presentReqs = [];
    for(let j=0;j<reqs.length;j++){
        if(currentHavingRequirements[j]){
            presentReqs.push(reqs[j]);
        }
    }
    // Set the value of reqs to be presentReqs. Here can eliminate some reqs.
    reqs = [...presentReqs];
    // console.log(reqs);

    // Initialize an array optimalDistance to store the minimum distance from each requirement to the current block.
    optimalDistance = []
    for(let req of reqs){
        optimalDistance.push(Number.MAX_SAFE_INTEGER);
    }

    // Initialize an array rightOptimalDistance to store the minimum distance from each requirement to each block, starting from the last block and going backwards.
    // Iterate through the blocks list in reverse order. For each block, iterate through each requirement in "reqs". If the current requirement is present in the current block, set the corresponding element in "optimalDistance" to 0. Otherwise, increment it by 1.
    // Append a copy of "optimalDistance" to "rightOptimalDistance".
    var rightOptimalDistance = []
    for(let i=blocks.length-1;i>=0;i--){
        for(let j=0;j<reqs.length;j++){
            optimalDistance[j] =  blocks[i][reqs[j]]||false ? 0 : optimalDistance[j]+1
        }
        rightOptimalDistance.push([...optimalDistance]);
    }  

    var optimalIndex = 0;
    var optimalDistance = Number.MAX_SAFE_INTEGER;

    var leftOptimalDistance = [];
    for(let req of reqs){
        leftOptimalDistance.push(Number.MAX_SAFE_INTEGER);
    }

    // Iterate through each block in the "blocks" list. For each block, iterate through each requirement in "reqs".
    // If the current requirement is present in the current block, set the corresponding element in "leftOptimalDistance" to 0.
    // Otherwise, increment it by 1

    for(let i=0;i<blocks.length;i++){
        for(let j=0;j<reqs.length;j++){
            leftOptimalDistance[j] =  blocks[i][reqs[j]]||false ? 0 : leftOptimalDistance[j]+1;
        }
        
        max_dist = 0
        for(let j=0;j<reqs.length;j++){
            max_dist = Math.max(max_dist,Math.min(leftOptimalDistance[j],rightOptimalDistance[n-i-1][j]));
        }
        
        // If "max_dist" is less than "optimalDistance", set "optimalIndex" to the current index and "optimalDistance" to "max_dist"
        if (max_dist < optimalDistance){
            optimalIndex = i;
            optimalDistance = max_dist;
        }
    }

    // Return the "optimalIndex".

    return optimalIndex
}

// let blocks = [
//     {
//         "gym": false,
//         "school": true,
//         "store": false,
//     },
//     {
//         "gym": false,
//         "school": false,
//         "store": false,
//     },
//     {
//         "gym": true,
//         "school": true,
//         "store": false,
//     },
//     {
//         "gym": false,
//         "school": true,
//         "store": false,
//     },
//     {
//     "gym": false,
//     "school": true,
//     "store": true,
//     }
// ];
// let reqs = ["gym", "school", "store"];
// Do not edit the line below.
// let optimalBlockIndex = apartmentHunting(blocks, reqs);
// console.log(optimalBlockIndex); 

exports.apartmentHunting = apartmentHunting;

