import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
	return (
		<Box>
			<Routes>
				<Route path="/" element={<HomePage />}></Route>
			</Routes>
		</Box>
	);
}

export default App;
