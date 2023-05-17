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
} from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { TbHistory } from "react-icons/tb";

export default function RHistory() {
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
						/>
					</Flex>
					<Flex className="mid">
						<TableContainer>
							<Table variant="simple" colorScheme="black">
								<TableCaption>
									records are rendered on server time
								</TableCaption>
								<Thead>
									<Tr>
										<Th>Date</Th>
										<Th isNumeric>CLOCK-IN</Th>
										<Th isNumeric>CLOCK-OUT</Th>
									</Tr>
								</Thead>
								<Tbody>
									<Tr>
										<Td>26 Apr</Td>
										<Td isNumeric>09:00</Td>
										<Td isNumeric>16:01</Td>
									</Tr>
									<Tr>
										<Td>26 Apr</Td>
										<Td isNumeric>09:00</Td>
										<Td isNumeric>16:01</Td>
									</Tr>
									<Tr>
										<Td>26 Apr</Td>
										<Td isNumeric>09:00</Td>
										<Td isNumeric>16:01</Td>
									</Tr>
								</Tbody>
							</Table>
						</TableContainer>
					</Flex>
					<Flex className="bot">
						<Flex className="nav">
							<Flex className="nav-child">
								<Icon
									as={RxDashboard}
									w={10}
									h={10}
									color="white"
								/>
							</Flex>
							<Flex className="nav-child">
								<Icon
									as={TbHistory}
									w={10}
									h={10}
									color="white"
								/>
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
