
const Navbar = ({screen,setScreen})=>{
    return(
        <div className="">
            <ul className="flex gap-4 color-background ">
                <li className={`border-2 rounded-md p-1 ${screen=="Profile"?"border-active-element text-active-element ":"border-white text-white "}`} onClick={()=>{setScreen("Profile")}}>Profile</li>
                <li className={`border-2 rounded-md p-1 ${screen=="Store"?"border-orange-400 text-orange-400":"border-white text-white"}`} onClick={()=>{setScreen("Store")}}>Store</li>
                <li className={`border-2 rounded-md p-1 ${screen=="Quests"?"border-orange-400 text-orange-400":"border-white text-white"}`} onClick={()=>{setScreen("Quests")}}>Quests</li>
                <li className={`border-2 rounded-md p-1 ${screen=="Home"?"border-orange-400 text-orange-400":"border-white text-white"}`} onClick={()=>{setScreen("Home")}}>Home</li>
                <li className={`border-2 rounded-md p-1 ${screen=="Habits"?"border-orange-400 text-orange-400":"border-white text-white"}`} onClick={()=>{setScreen("Habits")}}>Habits</li>
                <li className={`border-2 rounded-md p-1 ${screen=="Settings"?"border-orange-400 text-orange-400":"border-white text-white"}`} onClick={()=>{setScreen("Settings")}}>Settings</li>
            </ul>
        </div>
    );
};
export default Navbar;