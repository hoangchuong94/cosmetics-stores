import { User } from "@prisma/client";
import axios from "axios";

export const getUserService = async (email: string) => {
  const user = await axios.post("http://localhost:3000/api/user", {
    email,
  });
  return user;
};
