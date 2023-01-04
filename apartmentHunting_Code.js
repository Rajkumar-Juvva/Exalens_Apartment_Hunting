function apartmentHunting(blocks, reqs) {
    const n = blocks.length;

    //
    currentHavingRequirements = []
    for(let req of reqs){
        currentHavingRequirements.push(false);
    }
    for(let i=0;i<n;i++){
        for(let j=0;j<reqs.length;j++){
            currentHavingRequirements[j] =  blocks[i][reqs[j]]||false ? true : currentHavingRequirements[j]
        }
    }

    presentReqs = [];
    for(let j=0;j<reqs.length;j++){
        if(currentHavingRequirements[j]){
            presentReqs.push(reqs[j]);
        }
    }
    reqs = [...presentReqs];
    // console.log(reqs);

    optimalDistance = []
    for(let req of reqs){
        optimalDistance.push(Number.MAX_SAFE_INTEGER);
    }

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

    for(let i=0;i<blocks.length;i++){
        for(let j=0;j<reqs.length;j++){
            leftOptimalDistance[j] =  blocks[i][reqs[j]]||false ? 0 : leftOptimalDistance[j]+1;
        }
        
        max_dist = 0
        for(let j=0;j<reqs.length;j++){
            max_dist = Math.max(max_dist,Math.min(leftOptimalDistance[j],rightOptimalDistance[n-i-1][j]));
        }
        
        if (max_dist < optimalDistance){
            optimalIndex = i;
            optimalDistance = max_dist;
        }
    }

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

