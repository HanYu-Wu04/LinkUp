import { ChakraProvider } from "@chakra-ui/react";
import {SessionProvider} from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider><ChakraProvider>{children}</ChakraProvider></SessionProvider>;
}
