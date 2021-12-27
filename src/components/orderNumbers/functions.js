function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}
  

export function createRandomArray (size){
    let array = [];
    let numberOfnumber = (size.height+1) * (size.width+1);
    for (let i=1; i <= numberOfnumber; i++) {
        array.push(i);
    }   
    array = shuffle(array);
    return array;
}