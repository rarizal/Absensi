import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import RRegister from "./pages/rregister";
import RLogin from "./pages/rlogin";
import RHistory from "./pages/rhistory";
import RDashboard from "./pages/rdashboard";

function App() {
	return (
		<Box>
			<Routes>
				<Route path="/" element={<HomePage />}></Route>
				<Route path="/register" element={<Register />}></Route>
				<Route path="/rregister" element={<RRegister />}></Route>
				<Route path="/rlogin" element={<RLogin />}></Route>
				<Route path="/rhistory" element={<RHistory />}></Route>
				<Route path="/rdashboard" element={<RDashboard />}></Route>
			</Routes>
		</Box>
	);
}

export default App;
