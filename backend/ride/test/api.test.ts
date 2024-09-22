import axios, { Axios, AxiosInstance } from "axios";
import { SignupExceptionCode } from "../src/exceptions";

describe("Validate API", () => {
  const signupUser = (input: any) =>
    axios.post("http://localhost:3000/signup", input);

  it("should throw invalid name error", async () => {
    let validUserInput = {
      name: "Arthur",
      email: "arthurpires1@hotmail.com",
      cpf: "09464525630",
      carPlate: "ABC1234",
      isDriver: true,
      isPassenger: false,
      password: "123456",
    };

    const { status, data: response } = await signupUser(validUserInput).catch(
      (e) => ({ status: e.status, data: e.response.data })
    );
    expect(status).toBe(422);
    expect(response.code).toBe(SignupExceptionCode.INVALID_NAME);
  });

  it("should throw invalid email error", async () => {
    let validUserInput = {
      name: "Arthur Pires",
      email: "arthurpireshotmail.com",
      cpf: "09464525630",
      carPlate: "ABC1234",
      isDriver: true,
      isPassenger: false,
      password: "123456",
    };
    const { status, data: response } = await signupUser(validUserInput).catch(
      (e) => ({ status: e.status, data: e.response.data })
    );

    expect(status).toBe(422);
    expect(response.code).toBe(SignupExceptionCode.INVALID_EMAIL);
  });

  it("should throw invalid cpf error", async () => {
    let validUserInput = {
      name: "Arthur Pires",
      email: "arthurpires2@hotmail.com",
      cpf: "0946452563011",
      carPlate: "ABC1234",
      isDriver: true,
      isPassenger: false,
      password: "123456",
    };
    const { status, data: response } = await signupUser(validUserInput).catch(
      (e) => ({ status: e.status, data: e.response.data })
    );

    expect(status).toBe(422);
    expect(response.code).toBe(SignupExceptionCode.INVALID_CPF);
  });

  it("should throw invalid car plate error", async () => {
    let validUserInput = {
      name: "Arthur Pires",
      email: "arthurpires3@hotmail.com",
      cpf: "09464525630",
      carPlate: "ABC1A234",
      isDriver: true,
      isPassenger: false,
      password: "123456",
    };
    const { status, data: response } = await signupUser(validUserInput).catch(
      (e) => ({ status: e.status, data: e.response.data })
    );

    expect(status).toBe(422);
    expect(response.code).toBe(SignupExceptionCode.INVALID_CAR_PLATE);
  });

  it("should throw account already exists error", async () => {
    let validUserInput = {
      name: "Arthur Pires",
      email: "arthurpires@hotmail.com",
      cpf: "09464525630",
      carPlate: "ABC1234",
      isDriver: true,
      isPassenger: false,
      password: "123456",
    };
    const { status, data: response } = await signupUser(validUserInput).catch(
      (e) => ({ status: e.status, data: e.response.data })
    );

    expect(status).toBe(422);
    expect(response.code).toBe(SignupExceptionCode.ACCOUNT_ALREADY_EXISTS);
  });

  it("should create a driver account", async () => {
    const randomInt = Math.floor(Math.random() * 1000);
    let validUserInput = {
      name: "Arthur Pires",
      email: `arthurpires${randomInt}@hotmail.com`,
      cpf: "09464525630",
      carPlate: "ABC1234",
      isDriver: true,
      isPassenger: false,
      password: "123456",
    };
    const { status, data: response } = await signupUser(validUserInput).catch(
      (e) => ({ status: e.status, data: e.response.data })
    );

    expect(status).toBe(200);
    expect(response.accountId).toBeDefined();
  });

  it("should create a passenger account", async () => {
    const randomInt = Math.floor(Math.random() * 1000);
    let validUserInput = {
      name: "Arthur Pires",
      email: `arthurpires${randomInt}@hotmail.com`,
      cpf: "09464525630",
      isDriver: false,
      isPassenger: true,
      password: "123456",
    };
    const { status, data: response } = await signupUser(validUserInput).catch(
      (e) => ({ status: e.status, data: e.response.data })
    );
    expect(status).toBe(200);
    expect(response.accountId).toBeDefined();
  });
});
