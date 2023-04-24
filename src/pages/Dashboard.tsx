import Navbar from "../components/Navbar/Navbar";

function Dashboard() {
   return (
      <div className="grid grid-cols-wrapper bg-backgroundSystem">
         <Navbar />
         <div className="flex flex-col p-4"></div>
      </div>
   );
}

export default Dashboard;
