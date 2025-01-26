"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
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

// Define Zod schema
const signInSchema = z.object({
  phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  apiError: z.string().optional(),
});

type SignInFormData = z.infer<typeof signInSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignIn = async (data: SignInFormData) => {
    setIsSubmitting(true);

    const response = await fetch("/api/user/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      setError("apiError", { type: "manual", message: errorData.error });
      setIsSubmitting(false);
      return;
    }
    await signIn("credentials", {
      redirect: true,
      redirectTo: "/dashboard",
      phoneNumber: data.phoneNumber,
      password: data.password,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-gray-50 p-6">
      <Box bg="white" p={8} rounded="lg" shadow="2xl" width="full" maxW="md" border="1px solid" borderColor="gray.200">
        <Heading as="h1" size="lg" textAlign="center" mb={6}>
          Welcome Back
        </Heading>
        <Text textAlign="center" mb={4} color="gray.600">
          Sign in to your account to continue
        </Text>
        <form onSubmit={handleSubmit(handleSignIn)}>
          <FormControl isInvalid={!!errors.phoneNumber} mb={4}>
            <FormLabel>Phone Number</FormLabel>
            <Input type="tel" {...register("phoneNumber")} placeholder="Enter your phone number" maxLength={10} />
            <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password} mb={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" {...register("password")} placeholder="Enter your password" />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          {errors.apiError && (
            <Text color="red.500" fontSize="sm" mt={1}>
              {errors.apiError.message}
            </Text>
          )}
          <Button type="submit" colorScheme="blue" width="full" mt={4} isLoading={isSubmitting}>
            Sign In
          </Button>
        </form>
        <Text textAlign="center" mt={4} color="gray.600">
          Don&apos;t have an account?{" "}
          <Link as={NextLink} href="/signup" color="blue.500" className="hover:underline">
            Sign Up
          </Link>
        </Text>
      </Box>
    </div>
  );
};

export default Login;
