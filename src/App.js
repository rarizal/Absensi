import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import RRegister from "./pages/rregister";
import RLogin from "./pages/rlogin";
import RHistory from "./pages/rhistory";
import RDashboard from "./pages/rdashboard";

function App() {
	const user_log = JSON.parse(localStorage.getItem("user"));
	return (
		<Box>
			{user_log ? (
				<Routes>
					<Route path="/" element={<RDashboard />}></Route>
					<Route path="/register" element={<Register />}></Route>
					<Route path="/rregister" element={<RRegister />}></Route>
					<Route path="/rlogin" element={<RLogin />}></Route>
					<Route path="/rhistory" element={<RHistory />}></Route>
				</Routes>
			) : (
				<Routes>
					<Route path="/" element={<RLogin />}></Route>
					<Route path="/rregister" element={<RRegister />}></Route>
					<Route path="/rlogin" element={<RLogin />}></Route>
				</Routes>
			)}
		</Box>
	);
}

export default App;
