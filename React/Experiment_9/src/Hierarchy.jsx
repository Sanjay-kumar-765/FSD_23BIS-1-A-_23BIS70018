// src/Hierarchy.jsx
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getInfo() {
    return `Name: ${this.name}, Age: ${this.age}`;
  }
}

class Student extends Person {
  constructor(name, age, course) {
    super(name, age);
    this.course = course;
  }

  getInfo() {
    // extends method to include course
    return `${super.getInfo()}, Course: ${this.course}`;
  }
}

class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }

  getInfo() {
    // extends method to include subject
    return `${super.getInfo()}, Subject: ${this.subject}`;
  }
}

export { Person, Student, Teacher };
