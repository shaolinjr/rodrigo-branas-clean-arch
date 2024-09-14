import { AccountNotFoundException } from "../exceptions";

export const getAccountById = async (connection: any, id: string) => {
  // NOTE: I am not sure if the not found exception should be thrown from this function.
  const [account] = await connection.query(
    "select * from ccca.account where account_id = $1",
    [id]
  );
  if (!account) throw new AccountNotFoundException();
  return account;
};
