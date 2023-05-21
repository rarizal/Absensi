import { Flex, Input, FormControl, FormLabel, Button } from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

export default function RLogin() {
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		onSubmit: async (values) => {
			try {
				const response = await axios.post(
					"http://localhost:2000/login",
					{
						email: values.email,
						password: values.password,
					}
				);

				console.log(response.data);
				alert(`Hi 👋 ${response.data.id}, you're logged in.`);
				const user = { id: response.data.id };
				localStorage.setItem("user", JSON.stringify(user));
			} catch (error) {
				console.error(error);
				alert("Login failed");
			}
		},
	});

	return (
		<>
			<form onSubmit={formik.handleSubmit}>
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
							<Flex className="h-3">
								to clock-in and clock-out
							</Flex>
						</Flex>
						<Flex className="body" h={"25%"}>
							<FormControl>
								<FormLabel>Email</FormLabel>
								<Input
									type="text"
									id="email"
									name="email"
									onChange={formik.handleChange}
									value={formik.values.email}
								/>
							</FormControl>

							<FormControl>
								<FormLabel>Password</FormLabel>
								<Input
									type="text"
									id="fullname"
									name="password"
									onChange={formik.handleChange}
									value={formik.values.password}
								/>
							</FormControl>
						</Flex>
						<Flex className="end">
							<Button colorScheme="cyan" type="submit">
								Login
							</Button>
							<span className="center">or</span>

							<Button colorScheme="gray">
								<Link to="/rregister">Register</Link>
							</Button>
						</Flex>
					</Flex>
				</Flex>
			</form>
		</>
	);
}
