import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showGameToast = ({ title, description, icon,border_color,text_color,progressClass_color}) => {
    

    toast(
        <div className={`flex items-center gap-3`}>
            <div className="text-3xl">{icon}</div>
            <div>
                <h1 className={`${text_color} font-bold text-lg`}>{title}</h1>
                <p className="text-white text-sm">{description}</p>
            </div>
        </div>,
        {
            className: `!bg-[#0e0e2c] border-2 ${border_color}  rounded-xl shadow-lg`,
            progressClassName: `${progressClass_color}`,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
        }
    );
};
