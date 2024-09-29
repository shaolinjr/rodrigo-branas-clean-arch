import { Cpf } from "../src/domain/vos/cpf";
import { InvalidCpfException } from "../src/exceptions";

describe("Test Cpf creation", () => {
  test("Deve validar um cpf com o digito diferente de zero", function () {
    const cpf = new Cpf("97456321558");
    expect(cpf).toBeDefined();
  });

  test("Deve validar um cpf com o segundo digito zero", function () {
    const cpf = new Cpf("71428793860");
    expect(cpf).toBeDefined();
  });

  test("Deve validar um cpf com o primeiro digito zero", function () {
    const cpf = new Cpf("87748248800");
    expect(cpf).toBeDefined();
  });

  test("Não deve validar um cpf com menos de 11 caracteres", function () {
    expect(() => new Cpf("9745632155")).toThrow(InvalidCpfException);
  });

  test("Não deve validar um cpf com todos os caracteres iguais", function () {
    expect(() => new Cpf("11111111111")).toThrow(InvalidCpfException);
  });

  test("Não deve validar um cpf com letras", function () {
    expect(() => new Cpf("97a56321558")).toThrow(InvalidCpfException);
  });
});
