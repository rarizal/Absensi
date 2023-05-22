import {
	Flex,
	Icon,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	Input,
	Button,
} from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { TbHistory } from "react-icons/tb";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/en-gb";
import { Link } from "react-router-dom";

export default function RHistory() {
	moment.locale("en-gb");

	const [userData, setUserData] = useState([
		{
			id: 0,
			clockIn: "",
			clockOut: null,
			createdAt: "",
			updatedAt: "",
			user_id: "",
		},
	]);

	const [monthx, setMonthx] = useState("");

	function handleMonthChange(e) {
		setMonthx(e.target.value);
	}

	async function fetchData() {
		try {
			if (!monthx) {
				const user_log = JSON.parse(localStorage.getItem("user"));
				const fetchData = await axios.post(
					"http://localhost:2000/main",
					{
						user_id: user_log.id,
					}
				);
				setUserData(fetchData.data);
				console.log("FETCH DATA", fetchData.data);
				console.log("USER DATA", userData);
				console.log("MONTH FROM PICKER", monthx);
			} else if (monthx) {
				const user_log = JSON.parse(localStorage.getItem("user"));
				alert(monthx);
				const fetchData = await axios.post(
					"http://localhost:2000/main/fetchbymonth",
					{
						user_id: user_log.id,
						createdAt: monthx,
					}
				);
				setUserData(fetchData.data);
			}
		} catch (error) {
			alert(error);
		}
	}

	async function PrintVal() {
		console.log("BOOL monthx", Boolean(monthx));
	}

	useEffect(() => {
		fetchData();
	}, [monthx]);

	function LogOut() {
		localStorage.removeItem("user");
	}

	return (
		<>
			<Flex
				w={"100vw"}
				h={"100vh"}
				justifyContent={"center"}
				bg={"#F0F3FB"}
			>
				<Flex className="container" bg={"#F8F9FD"}>
					<Flex className="top">
						<Flex>Select month:</Flex>
						<Input
							placeholder="Select Month"
							type="month"
							colorScheme="teal"
							value={monthx}
							onChange={handleMonthChange}
						/>
					</Flex>
					<Flex className="mid">
						<TableContainer>
							<Table variant="simple" colorScheme="black">
								<TableCaption>
									records are rendered on server time <br />
									<Button onClick={PrintVal}>
										print val
									</Button>
								</TableCaption>
								<Thead>
									<Tr>
										<Th>Date</Th>
										<Th isNumeric>CLOCK-IN</Th>
										<Th isNumeric>CLOCK-OUT</Th>
									</Tr>
								</Thead>
								<Tbody>
									{userData.map((val) => (
										<TableRows
											clockintime={val.createdAt}
											clockoutime={val.updatedAt}
										/>
									))}
								</Tbody>
							</Table>
						</TableContainer>
					</Flex>
					<Flex className="bot">
						<Flex className="nav">
							<Flex className="nav-child">
								<Link to="/">
									<Icon
										as={RxDashboard}
										w={10}
										h={10}
										color="white"
									/>
								</Link>
							</Flex>
							<Flex className="nav-child">
								<Icon
									as={TbHistory}
									w={10}
									h={10}
									color="white"
								/>
							</Flex>
							<Flex className="nav-child" onClick={LogOut}>
								<Icon
									as={FiLogOut}
									w={10}
									h={10}
									color="white"
								/>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
}

function TableRows(props) {
	return (
		<Tr>
			<Td>{moment(props.clockintime).format("D MMM")}</Td>
			<Td isNumeric>{moment(props.clockintime).format("LT")} WIB</Td>
			<Td isNumeric>
				{props.clockintime === props.clockoutime
					? "-"
					: moment(props.clockintime).format("LT")}{" "}
				WIB
			</Td>
		</Tr>
	);
}
