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
	Stat,
	StatLabel,
	StatNumber,
	StatHelpText,
	Button,
} from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { TbHistory } from "react-icons/tb";
import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/en-gb";
import { Link } from "react-router-dom";

export default function RDashboard() {
	moment.locale("en-gb");

	const [userData, setUserData] = useState({
		id: 0,
		clockIn: "",
		clockOut: null,
		createdAt: "",
		updatedAt: "",
		user_id: "",
	});

	const [time, setTime] = useState(moment().format("LT"));

	// function clearuserData() {
	// 	const clean = {
	// 		id: 0,
	// 		clockIn: "",
	// 		clockOut: null,
	// 		createdAt: "",
	// 		updatedAt: "",
	// 		user_id: "",
	// 	};
	// 	// setUserData(clean);
	// 	console.log("userData", userData);
	// 	console.log("Today", moment().format("L"));
	// 	console.log("Tomorrow", moment().add(1, "days").format("L"));
	// 	console.log("get moment with format", moment().format("YYYY-MM-DD"));
	// }

	async function fetchData() {
		try {
			const user_log = JSON.parse(localStorage.getItem("user"));
			const fetchData = await axios.post(
				"http://localhost:2000/main/fetch",
				{
					user_id: user_log.id,
					createdAt: moment().format("YYYY-MM-DD"),
				}
			);
			setUserData(fetchData.data);
		} catch (error) {
			alert(error);
		}
	}

	async function clockIn() {
		const user_log = JSON.parse(localStorage.getItem("user"));
		try {
			if (userData.clockIn) {
				alert("KAMU SUDAH CLOCK IN");
			} else {
				await axios
					.post("http://localhost:2000/main/clockin", {
						clockIn: "CLOCK-IN",
						user_id: user_log.id,
						createdAt: moment().format("YYYY-MM-DD"),
					})
					.then(alert("CLOCK-IN BERHASIL"));

				fetchData();
			}
		} catch (error) {
			alert(error);
		}
	}

	async function clockOut() {
		const user_log = JSON.parse(localStorage.getItem("user"));
		try {
			if (!userData.clockIn) {
				alert("KAMU BELUM CLOCK-IN");
			} else if (userData.clockOut) {
				alert("KAMU SUDAH CLOCK-OUT");
			} else {
				await axios
					.patch("http://localhost:2000/main", {
						clockOut: "CLOCK-OUT",
						user_id: user_log.id,
						createdAt: moment().format("YYYY-MM-DD"),
					})
					.then(alert("CLOCK-OUT BERHASIL"));
				fetchData();
			}
		} catch (error) {
			alert(error);
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTime(moment().format("LT"));
		}, 4000);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	//auto-clock out if user forget
	// useEffect(() => {
	// 	const datenow = moment().format("YYYY-MM-DD");
	// 	const datetmrw = moment(userData.createdAt)
	// 		.add(1, "days")
	// 		.format("YYYY-MM-DD");

	// 	if (datenow === datetmrw) {
	// 		clockOut();
	// 		fetchData();
	// 	}
	// }, []);

	function PrintVal() {
		console.log("USER DATA", userData);
	}

	return (
		<>
			<Flex
				w={"100vw"}
				h={"100vh"}
				justifyContent={"center"}
				bg={"#F0F3FB"}
			>
				<Flex
					className="container"
					style={{
						background: userData.clockIn
							? userData.clockOut
								? "linear-gradient(180deg, rgba(122, 252, 252, 0.8) 0%, rgba(255, 255, 255, 0.5) 33%)"
								: "linear-gradient(180deg, rgba(195, 232, 141, 0.8) 0%, rgba(255, 255, 255, 0.5) 33%)"
							: "linear-gradient(180deg, rgba(122, 252, 252, 0.8) 0%, rgba(255, 255, 255, 0.5) 33%)",
					}}
				>
					<Flex className="atas">
						<Flex className="atas-1">
							<Flex onClick={fetchData}>Live Attendance</Flex>
							<br />
							<Flex
								fontSize={"55px"}
								fontWeight={"bold"}
								color={"black"}
							>
								{time}
							</Flex>
							<Flex>{moment().format("ddd, DD MMMM YYYY")}</Flex>
						</Flex>
						<Flex className="atas-2">
							<Flex className="detail">
								<Flex className="detail-1">
									<Stat w={"100%"}>
										<StatLabel textAlign={"center"}>
											Working Hour
										</StatLabel>
										<StatNumber textAlign={"center"}>
											09:00 - 17:00
										</StatNumber>
										<StatHelpText textAlign={"center"}>
											Western Indonesian Time <br />
											<Button
												display={"none"}
												onClick={PrintVal}
											>
												Print
											</Button>
										</StatHelpText>
									</Stat>
								</Flex>
								<Flex className="detail-2">
									<Flex
										className="opsi-cont"
										onClick={clockIn}
									>
										<Flex
											className="opsi"
											bg={"green.100"}
											borderColor={"green.200"}
											color={"green.500"}
										>
											{" "}
											<Icon
												as={AiOutlineUserAdd}
												w={10}
												h={10}
											/>
											<Flex>Clock-In</Flex>
										</Flex>
									</Flex>
									<Flex
										className="opsi-cont"
										onClick={clockOut}
									>
										<Flex
											className="opsi"
											bg={"orange.100"}
											borderColor={"orange.200"}
											color={"orange.500"}
										>
											{" "}
											<Icon
												as={AiOutlineUserDelete}
												w={10}
												h={10}
											/>
											<Flex>Clock-Out</Flex>
										</Flex>
									</Flex>
								</Flex>
							</Flex>
						</Flex>
					</Flex>
					<Flex className="tengah">
						Attendance Log:
						<TableContainer>
							<Table variant="simple" colorScheme="blackAlpha">
								<TableCaption>
									records are rendered on server time
								</TableCaption>
								<Thead>
									<Tr>
										<Th>Date</Th>
										<Th isNumeric>TIME LOG</Th>
										<Th isNumeric>ACTIVITY</Th>
									</Tr>
								</Thead>
								<Tbody>
									<Tr
										display={
											userData.clockIn ? "true" : "none"
										}
									>
										<Td>
											{moment(userData.createdAt).format(
												"D MMM"
											)}
										</Td>
										<Td isNumeric>
											{moment(userData.createdAt).format(
												"LT"
											)}{" "}
											WIB
										</Td>
										<Td isNumeric>{userData.clockIn}</Td>
									</Tr>
									<Tr
										display={
											userData.clockOut ? "true" : "none"
										}
									>
										<Td>
											{moment(userData.updatedAt).format(
												"D MMM"
											)}
										</Td>
										<Td isNumeric>
											{moment(userData.updatedAt).format(
												"LT"
											)}{" "}
											WIB
										</Td>
										<Td isNumeric>{userData.clockOut}</Td>
									</Tr>
								</Tbody>
							</Table>
						</TableContainer>
					</Flex>
					<Flex className="bot">
						<Flex
							className="nav"
							style={{
								background: userData.clockIn
									? userData.clockOut
										? "rgba(13, 197, 234, 1)"
										: "rgba(195, 232, 141, 1)"
									: "rgba(13, 197, 234, 1)",
							}}
						>
							<Flex className="nav-child">
								<Icon
									as={RxDashboard}
									w={10}
									h={10}
									color="white"
								/>
							</Flex>

							<Flex className="nav-child">
								<Link to="/rhistory">
									<Icon
										as={TbHistory}
										w={10}
										h={10}
										color="white"
									/>
								</Link>
							</Flex>

							<Flex className="nav-child">
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

// function Rows(props) {
// 	return (
// 		// <Tr>
// 		// 	<Td>{props.date}</Td>
// 		// 	<Td isNumeric>{props.time}</Td>
// 		// 	<Td isNumeric>{props.activity}</Td>
// 		// </Tr>

// 	);
// }
