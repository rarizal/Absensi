import {
	Flex,
	Input,
	FormControl,
	FormLabel,
	Select,
	Button,
} from "@chakra-ui/react";

export default function RRegister() {
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
						<Flex className="h-2">Sign Up</Flex>
						<Flex className="h-3">to clock-in and clock-out</Flex>
					</Flex>
					<Flex className="body">
						<FormControl>
							<FormLabel>Name</FormLabel>
							<Input type="text" />
						</FormControl>

						<FormControl>
							<FormLabel>Address</FormLabel>
							<Input type="text" />
						</FormControl>

						<FormControl>
							<FormLabel>Email</FormLabel>
							<Input type="text" />
						</FormControl>

						<FormControl>
							<FormLabel>Password</FormLabel>
							<Input type="text" />
						</FormControl>

						<FormControl>
							<FormLabel>Company</FormLabel>
							<Select placeholder="Select company">
								<option>Purwadhika</option>
								<option>Hacktiv8</option>
								<option>Dicoding</option>
								<option>Binar Academy</option>
							</Select>
						</FormControl>
					</Flex>
					<Flex className="end">
						<Button colorScheme="cyan">Register</Button>
						<span className="center">or</span>
						<Button colorScheme="gray">Login</Button>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
}
