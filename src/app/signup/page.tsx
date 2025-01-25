"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Text,
  Heading,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { colors } from "@/styles/colors";
import { signIn } from "@/auth";

// Define Zod schema
const signUpSchema = z.object({
  // Phone number must be valid
  phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  apiError: z.string().optional(),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function Signup() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });
  const router = useRouter();

  const handleSignUp = async (data: SignUpFormData) => {
    // Check if user exists in db
    const res = await fetch("/api/user/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber: data.phoneNumber }),
    });
    if (!res.ok) {
      setError("apiError", { type: "manual", message: "User already exists." });
      return;
    }
    const { isUser } = await res.json();
    if (isUser) {
      setError("apiError", { type: "manual", message: "User already exists." });
      console.log("User already exists.");
      return;
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("phoneNumber", data.phoneNumber);
      localStorage.setItem("password", data.password);
      router.push("/home");
    }
    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("response for signup", response);
    if (!response.ok) {
      response.json().then((data) => {
        setError("apiError", { type: "manual", message: data.error });
      });
      return;
    } else {
      // Automatically sign in the user after successful sign-up
      await signIn("credentials", {
        redirect: true, // Prevents automatic redirect
        redirectTo: "/home",
        phoneNumber: data.phoneNumber,
        password: data.password,
      });
    }
    const user = await response.json();
    console.log("Signed up user:", user);
  };

  return (
    <Flex
      align="center"
      justify="center"
      minH="100vh"
      position="relative"
      style={{ backgroundColor: colors.darkMode.background }} // Modern dark theme color
    >
      <Box
        bg="white"
        p={8}
        rounded="lg"
        shadow="2xl"
        width="full"
        maxW="md"
        position="relative"
        borderColor="black"
        backgroundColor="rgba(255, 255, 255, 0.9)"
      >
        <Heading as="h1" size="lg" textAlign="center" mb={6}>
          Sign Up:
        </Heading>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <FormControl isInvalid={!!errors.firstName} mb={4}>
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              {...register("firstName")}
              placeholder="Enter your first name"
              borderColor="grey"
              focusBorderColor="black"
            />
            <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.lastName} mb={4}>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              {...register("lastName")}
              placeholder="Enter your last name"
              borderColor="grey"
              focusBorderColor="black"
            />
            <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.phoneNumber} mb={4}>
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="tel"
              {...register("phoneNumber")}
              placeholder="111-111-1111"
              maxLength={10}
              borderColor="grey"
              focusBorderColor="black"
            />
            <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password} mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              {...register("password")}
              borderColor="grey"
              placeholder="Enter your password"
              focusBorderColor="black"
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          {errors.apiError && (
            <Text color="red.500" fontSize="sm" mt={1}>
              {errors.apiError.message}
            </Text>
          )}
          <Button type="submit" colorScheme="blue" width="full" mt={4}>
            Sign Up
          </Button>

          <Text textAlign="center" mt={4}>
            Already have an account?{" "}
            <Link as={NextLink} href="/login" color="blue.500">
              Log In
            </Link>
          </Text>
        </form>
      </Box>
    </Flex>
  );
}
