import {Account} from "~/serverMiddleware/interfaces/Account";

export interface Data {
  accounts: {
    [key: string]: Account
  }
}
