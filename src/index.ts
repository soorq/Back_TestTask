class Dog {
  name: string;
  constructor(data: string) {
    this.name = data;
  }
}

const dog = new Dog('Rover');
if (dog instanceof Dog) {
  console.log(`${dog.name} is a dog`);
}
