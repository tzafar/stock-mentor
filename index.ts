
let abc: number = 10;
console.log(abc);

interface User {
    name: string,
    age: number 
}

let user: User = {age: 10, name: 'Toseef'}

console.log({user})

class Animal {
    private name: string;
    private breed: string;
    
    constructor(name: string, breed: string) {
        this.name = name;
        this.breed = breed;
    }

    move(distance: number){
        console.log(`${this.name} has moved ${distance} meters`)
    }
}

let lili: Animal = new Animal('Lili', 'Bandle');
lili.move(10);

function sayWhoIam<T>(breed: T): T {
    return breed;
}

console.log(sayWhoIam<number>(2));
console.log(sayWhoIam<string>("String"));

