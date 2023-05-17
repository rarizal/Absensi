import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import RRegister from "./pages/rregister";

function App() {
	return (
		<Box>
			<Routes>
				<Route path="/" element={<HomePage />}></Route>
				<Route path="/register" element={<Register />}></Route>
				<Route path="/rregister" element={<RRegister />}></Route>
			</Routes>
		</Box>
	);
}

export default App;
