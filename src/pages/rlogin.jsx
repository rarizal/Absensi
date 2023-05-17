import { Flex, Input, FormControl, FormLabel, Button } from "@chakra-ui/react";

export default function RLogin() {
	return (
		<>
			<Flex
				w={"100vw"}
				h={"100vh"}
				justifyContent={"center"}
				bg={"#F0F3FB"}
			>
				<Flex className="container">
					<Flex className="head">
						<Flex className="h-1"></Flex>
						<Flex className="h-2">Sign In</Flex>
						<Flex className="h-3">to clock-in and clock-out</Flex>
					</Flex>
					<Flex className="body" h={"25%"}>
						<FormControl>
							<FormLabel>Username / Email</FormLabel>
							<Input type="text" />
						</FormControl>

						<FormControl>
							<FormLabel>Password</FormLabel>
							<Input type="text" />
						</FormControl>
					</Flex>
					<Flex className="end">
						<Button colorScheme="cyan">Login</Button>
						<span className="center">or</span>
						<Button colorScheme="gray">Register</Button>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
}
