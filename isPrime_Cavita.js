function isPrime(n) {
    if (n < 2) {
        return false;
    }
    else{
        for (let i = 2; i < n; i++) { // mencari bilangan pembagi yang nilainya habis kalo dibagi
            if (n % i == 0){
                return false;
            }
        }
    }
    return true;
}

console.log(isPrime(10));
console.log(isPrime(43));