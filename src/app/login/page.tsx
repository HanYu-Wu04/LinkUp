"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { Image } from "@chakra-ui/react";
import { Box, Button, Flex, FormControl, FormLabel, FormErrorMessage, Input, Text, Link } from "@chakra-ui/react";
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

type SignUpFormData = z.infer<typeof signInSchema>;

export default function Login() {
  const [isLoaded, setIsLoaded] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signInSchema),
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSignIn = async (data: SignUpFormData) => {
    const response = await fetch("/api/user/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      response.json().then((data) => {
        setError("apiError", { type: "manual", message: data.error });
      });
    } else {
      await signIn("credentials", {
        redirect: true,
        redirectTo: "/home",
        phoneNumber: data.phoneNumber,
        password: data.password,
      });
    }
  };

  return (
    <Flex
      align="center"
      justify="center"
      minH="100vh"
      position="relative"
      style={{
        background:
          "url('https://images.pexels.com/photos/19727169/pexels-photo-19727169/free-photo-of-a-view-of-a-snowy-mountain-range-with-a-ski-slope.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2') center/cover no-repeat fixed",
      }}
    >
      <Box
        bg="white"
        p={8}
        rounded="lg"
        shadow="2xl"
        width="full"
        maxW="md"
        position="relative"
        backgroundColor="rgba(255, 255, 255, 0.95)"
      >
        <Flex direction="column" align="center" mb={6}>
          {isLoaded && (
            <Image
              src="/assets/Aery.jpg"
              alt="Logo"
              boxSize="200px"
              onError={(e) => console.error("Image failed to load:", e)}
              onLoad={() => console.log("Image loaded successfully")}
            />
          )}
        </Flex>

        <form onSubmit={handleSubmit(handleSignIn)}>
          <FormControl isInvalid={!!errors.phoneNumber} mb={4}>
            <FormLabel color="blue.700">Phone Number</FormLabel>
            <Input
              type="tel"
              {...register("phoneNumber")}
              placeholder="Enter your phone number"
              maxLength={10}
              focusBorderColor="blue.400"
              borderColor="blue.200"
            />
            <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password} mb={4}>
            <FormLabel color="blue.700">Password</FormLabel>
            <Input
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              focusBorderColor="blue.400"
              borderColor="blue.200"
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          {errors.apiError && (
            <Text color="red.500" fontSize="sm" mt={1}>
              {errors.apiError.message}
            </Text>
          )}

          <Link
            as={NextLink}
            href="/forgotpass"
            color="blue.500"
            fontSize="sm"
            display="block"
            textAlign="right"
            mt={2}
          >
            Forgot Password?
          </Link>

          <Button
            type="submit"
            bg="blue.400"
            width="full"
            mt={4}
            color="white"
            _hover={{ bg: "blue.500" }}
            _active={{ bg: "blue.600" }}
          >
            Sign In
          </Button>

          <Text textAlign="center" mt={4} color="gray.600">
            Don&apos;t have an account?{" "}
            <Link as={NextLink} href="/signup" color="blue.500">
              Sign Up
            </Link>
          </Text>
        </form>
      </Box>
    </Flex>
  );
}
