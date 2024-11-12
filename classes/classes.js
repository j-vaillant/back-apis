class Person {
  _firstName = "";
  _lastName = "";

  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  set firstName(name) {
    this._firstName = name;
  }

  get firstName() {
    return this._firstName;
  }

  set lastName(name) {
    this._lastName = name;
  }

  get lastName() {
    return this._lastName;
  }

  whoAmI() {
    console.log(`I'm ${this.firstName} ${this.lastName}`);
  }

  static greetings() {
    console.log(this.firstName);
  }
}

class Employee extends Person {
  _job = "";

  constructor(firstName, lastName, job) {
    super(firstName, lastName);
    this.job = job;
  }

  set job(job) {
    this._job = job;
  }

  get job() {
    return this._job;
  }

  whoAmI() {
    console.log(`I'm ${this.firstName} ${this.lastName} and I do ${this.job}`);
  }
}

const Jack = new Person("Jack", "London");

console.log(Jack.firstName);
const Joe = new Employee("Joe", "Black", "writing");

Jack.whoAmI();
Joe.whoAmI();
Person.greetings();
