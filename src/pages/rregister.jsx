import {
	Flex,
	Input,
	FormControl,
	FormLabel,
	Select,
	Button,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";

export default function RRegister() {
	const formik = useFormik({
		initialValues: {
			fullname: "",
			address: "",
			email: "",
			password: "",
			company_id: "",
		},
		onSubmit: async (values) => {
			console.log("VALUES", values);
			await axios.post("http://localhost:2000/users", values);
			alert(`Hi 👋 ${values.fullname}, your account has been created.`);
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
							<Flex className="h-2">Sign Up</Flex>
							<Flex className="h-3">
								to clock-in and clock-out
							</Flex>
						</Flex>
						<Flex className="body">
							<FormControl>
								<FormLabel>Name</FormLabel>
								<Input
									type="text"
									id="fullname"
									name="fullname"
									onChange={formik.handleChange}
									value={formik.values.fullname}
								/>
							</FormControl>

							<FormControl>
								<FormLabel>Address</FormLabel>
								<Input
									type="text"
									id="address"
									name="address"
									onChange={formik.handleChange}
									value={formik.values.address}
								/>
							</FormControl>

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
									id="password"
									name="password"
									onChange={formik.handleChange}
									value={formik.values.password}
								/>
							</FormControl>

							<FormControl>
								<FormLabel>Company</FormLabel>
								<Select
									placeholder="Select company"
									id="company_id"
									name="company_id"
									onChange={formik.handleChange}
									value={formik.values.company_id}
								>
									<option value={"1"}>Purwadhika</option>
									<option value={"1"}>Hacktiv8</option>
									<option value={"1"}>Dicoding</option>
									<option value={"1"}>Binar Academy</option>
								</Select>
							</FormControl>
						</Flex>
						<Flex className="end">
							<Button colorScheme="cyan" type="submit">
								Register
							</Button>
							<span className="center">or</span>
							<Button colorScheme="gray">
								<Link to="/rlogin">Login</Link>
							</Button>
						</Flex>
					</Flex>
				</Flex>
			</form>
		</>
	);
}
