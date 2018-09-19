class Ship {
    constructor(hull, firePower, accuracy, missiles){
    this.hull = hull;
    this.firePower = firePower;
    this.accuracy = accuracy;
    this.missiles = missiles;
    }
    attack(enemy){
        if (Math.random() < this.accuracy){
            enemy.hull -= this.firePower;
            if(enemy.hull <= 0){
                enemy.hull = 0;
            }
        }
    }
}

const USSAssembly = new Ship(20, 5, .7, 4);
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

// BONUS: MEGASHIP
// make a megaship
const megaShip = new Ship(
    10,
    5,
    .5);
// console.log(megaShip);
let numPods = 0;
// generating 5 weapon pods
for (let i=1; i<=5; i++){
    megaShip[`weaponPod${i}`] = {};
    megaShip[`weaponPod${i}`].hull = 5;
    numPods++;
}
// console.log(megaShip);


// // // // // // 

const randomRange = Math.floor(Math.random() * (10 - 5) + 5);
console.log(`${randomRange} ALIEN SHIPS WITHIN RANGE`);
console.log("");
generateAlienShips(randomRange);
// generateAlienShips(1);


const battle = (fighter1, fighter2) => {
    if(fighter1.missiles > 0){
        let missileOpt = prompt(`Use missiles? y/n. you have ${fighter1.missiles} remaining.`);
            if (missileOpt === 'y'){
                console.log("locked on, missle away.")
                fighter2.hull = 0;
                fighter1.missiles -= 1;
                console.log(`${fighter1.missiles} remaining missiles.`)
            }
            if(fighter1.missiles === 0){
                console.log('Out of missiles, switched to guns')
            }
        // missileOpt();
    }
    let round = 1;

    let randomShield = (Math.floor(Math.random()*(3-1)+1))
    let shield = fighter2.firePower - randomShield

    while(fighter1.hull > 0 && fighter2.hull > 0){
        // checking to see if alien is Megaship with active weapon pods
        if(fighter2 === megaShip){
            if(megaShip[`weaponPod${numPods}`].hull === 0){
                fighter1.attack(fighter2);
            }
            for(let i = 1; i<=numPods; i++){
                if(megaShip[`weaponPod${i}`].hull > 0){
                    console.log(`MegaShip weaponPod${i} hull has ${megaShip[`weaponPod${i}`].hull} hp.`)
                    fighter1.attack(fighter2[`weaponPod${i}`])
                    console.log(`MegaShip weaponPod${i} hull has ${megaShip[`weaponPod${i}`].hull} hp.`)
                    break;
                }
            }
        }
        else {
            fighter1.attack(fighter2);
        }
        console.log(`enemy hull is: ${fighter2.hull}`);
        if(fighter2.hull > 0){
            fighter2.attack(fighter1)-shield; 
            console.log(`Your shield saved ${shield} hp from enemy attack.`);
        } if (fighter1.hull === 0){
            console.log('Haha, you died');
            break;
        }
        
        console.log(`Your hull is: ${fighter1.hull}`);
        console.log(`round ${round} end`);  
        round ++; 
    }
    console.log(`ENEMY KILLED`);
    console.log('');
}

let shipTracker = 1;
for (let i = 0; i < aliens.length; i++) {
    console.log(`ALIEN SHIP ${shipTracker} INCOMING.`)
    battle(USSAssembly, aliens[i]);
    if(USSAssembly.hull === 0){
        console.log(`USS ASSEMBLY DESTROYED`);
        break
    }
    if(aliens[aliens.length-1].hull === 0){
        console.log(`USS ASSEMBLY WINS`);
        break
    }
    let choice = prompt("retreat? answer y/n");
    if (choice === 'y'){
        console.log("COWARD");
        break;
    }
    shipTracker++;
}

// battle(USSAssembly, megaShip);

