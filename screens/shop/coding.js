//climbing stairs
const climbStairs=(n)=>{
    const newarray=new Array(n).fill(0)
    newarray[1]=1
    newarray[2]=2
    for(i=3;i<=n;i++){
        newarray[i]=newarray[i-2]+newarray[i-1]
    }
    return newarray[n]
};

console.log(climbStairs(5))


