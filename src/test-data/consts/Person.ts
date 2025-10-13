export const testPerson = {
  firstName: "Ephim",
  lastName: "Shaposhnikov",
  address: "TestAddress str.64, apt.128",
  email: "test.mail@not.okay",
  phone: "+79913038011",
  country: "UK",
  gender: "male",
  hobbies: ["Movies", "Sports", "Gaming"],
  language: "Russian",
  skills: "JavaScript",
  birthYear: "1992",
  birthMonth: "February",
  birthDay: "16",
  password: "SupaSecretPass123",
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  get dateOfBirth() {
    return `${this.birthDay} ${this.birthMonth} ${this.birthYear}`;
  },

  get hobbiesList() {
    return this.hobbies.join(", ");
  },
};
