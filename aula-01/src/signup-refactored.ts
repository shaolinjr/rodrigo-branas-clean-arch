import pgp from "pg-promise";
import express from "express";
import { AccountNotFoundException } from "./exceptions";
import { BaseException } from "./exceptions/base.exception";
import { getAccountById } from "./use-cases/get-account.use-case";
import { createAccount } from "./use-cases/signup.use-case";

const app = express();
app.use(express.json());

/**
 * Refactoring actions:
 * 1. Split responsibilities into functions
 * 2. Create singleton for db connection
 * 3. Flatten validation logic
 * 4. Improve variable naming
 * 5. Improve error handling and clarity of error messages
 */

app.post("/signup", async function (req, res) {
  const input = req.body;
  const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
  try {
    const response = await createAccount(connection, input);
    res.json(response);
  } catch (error) {
    if (error instanceof BaseException) {
      res.status(422).json(error.toJSON());
    }
  } finally {
    await connection.$pool.end();
  }
});

app.get("/:accountId", async function (req, res) {
  const input = req.params;
  const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
  try {
    const account = await getAccountById(connection, input.accountId);
    res.json(account);
  } catch (error: any) {
    if (error instanceof AccountNotFoundException) {
      res.status(404).json(error.toJSON());
    } else {
      res
        .status(500)
        .json({ message: error?.message || "Internal server error" });
    }
  } finally {
    await connection.$pool.end();
  }
});

app.listen(3000);
