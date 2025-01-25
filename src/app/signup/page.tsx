'use client'

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

// Define Zod schema
const signUpSchema = z.object({
    email: z.string().email("Invalid email address"),
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
    const { register, handleSubmit, setError, formState: { errors } } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
    });
    const router = useRouter();

    const handleSignUp = async (data: SignUpFormData) => {
        // Check if user exists in db
        const res = await fetch('/api/user/test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: data.email })
        })
        if (!res.ok) {
            setError('apiError', { type: 'manual', message: 'User already exists.' });
            return;
        }
        const { isUser } = await res.json();
        if (isUser) {
            setError('apiError', { type: 'manual', message: 'User already exists.' });
            console.log('User already exists.');
            return;
        }
        if (typeof window !== 'undefined') {
            localStorage.setItem('email', data.email);
            localStorage.setItem('password', data.password);
            router.push('/profile/create');
        }
        // const response = await fetch("/api/user/signup", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(data),
        // });
        // if (!response.ok) {
        //     response.json().then((data) => {
        //         setError('apiError', { type: 'manual', message: data.error });
        //     });
        //     return;
        // } else {
        //     // Automatically sign in the user after successful sign-up
        // await signIn('credentials', {
        //     redirect: true, // Prevents automatic redirect
        //     redirectTo: '/createProfile',
        //     email: data.email,
        //     password: data.password,
        // });
        // }
        // const user = await response.json();
        // console.log("Signed up user:", user);
    };

    return (
        <Flex 
            align="center" 
            justify="center" 
            minH="100vh" 
            position="relative"
            style={{
                background: `url('https://images.pexels.com/photos/19727169/pexels-photo-19727169/free-photo-of-a-view-of-a-snowy-mountain-range-with-a-ski-slope.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2') center/cover no-repeat fixed`,
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
                backgroundColor="rgba(255, 255, 255, 0.9)"
            >
                <Heading as="h1" size="lg" textAlign="center" mb={6}>Sign Up:</Heading>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <FormControl isInvalid={!!errors.email} mb={4}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            {...register("email")}
                            placeholder="Enter your email"
                            focusBorderColor="blue.400"
                        />
                        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.password} mb={4}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            {...register("password")}
                            placeholder="Enter your password"
                            focusBorderColor="blue.400"
                        />
                        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                    </FormControl>

                    {errors.apiError && <Text color="red.500" fontSize="sm" mt={1}>{errors.apiError.message}</Text>}
                    <Button
                        type="submit"
                        colorScheme="blue"
                        width="full"
                        mt={4}
                    >
                        Sign Up
                    </Button >

                    <Text textAlign="center" mt={4}>
                        Already have an account?{" "}
                        <Link as={NextLink} href="/login" color="blue.500">
                            Log In
                        </Link>
                    </Text>
                </form >
            </Box >
        </Flex >
    );
}
