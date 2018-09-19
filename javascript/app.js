class Ship {
    constructor(hull, firePower, accuracy){
    this.hull = hull;
    this.firePower = firePower;
    this.accuracy = accuracy;
    }
    attack(enemy){
        if (Math.random() < this.accuracy){
            enemy.hull -= this.firePower;
        }
    }
}
const USSAssembly = new Ship(20, 5, .7);
const aliens = [];
const generateAlienShips = (num) =>{
    for (let i = 0; i < num; i++) {
        let hull = Math.floor(Math.random() * 4 + 3);
        let firePower = Math.floor(Math.random() * 3 + 2);
        let accuracy = (Math.floor(Math.random() * 3 + 6)/10);
        const alienShip = new Ship(hull, firePower, accuracy);
        aliens.push(alienShip);
    }
}
generateAlienShips(6);
const retreat = (input) => {
    if (input === 'yes'){
        return true;
    } 
}
const battle = (fighter1, fighter2) => {
    while(fighter1.hull > 0 && fighter2.hull > 0){
        fighter1.attack(fighter2);
        console.log(`enemy hull is: ${fighter2.hull}`);
        if(fighter2.hull > 0){
            fighter2.attack(fighter1); 
        }
        console.log(`Your hull is: ${fighter1.hull}`);
        console.log('round end');    
    }
    console.log(`ENEMY KILLED`);
    console.log('');
}
for (let i = 0; i < aliens.length; i++) {
    battle(USSAssembly, aliens[i]);
    if (retreat(propmt('retreat? yes or no.'))){
        return;
    }
}





