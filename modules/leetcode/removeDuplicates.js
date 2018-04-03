function removeDuplicates (nums) {
  let i = 0
  let j = 0
  while (i < nums.length) {
    if (nums[i] !== nums[j]) {
      j++
      nums[j] = nums[i]
    }
    i++
  }
  j += 1
  nums.length = j
  return j
}

var removeDuplicates = function(nums) {
  if(nums.length==0)return 0;
  var i=0;
  for(var j=1;j<nums.length;j++){
    if(nums[j]!==nums[i]){
      i++;
      nums[i]=nums[j];
    }
  }
  return i+1;
};

removeDuplicates([1, 1, 1, 2, 3, 3, 3, 3])