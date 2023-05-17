import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";

function App() {
	return (
		<Box>
			<Routes>
				<Route path="" element={<Header />}></Route>
			</Routes>
		</Box>
	);
}

export default App;
