import { t } from "i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import DeleteAnimalPageButton from "./DeleteAnimalPageButton";
import { RootState } from "../../store";

interface AdminButtonsProps {
    animal: {
        user_id: number;
    };
    id: string;
}

const AdminButtons: React.FC<AdminButtonsProps> = ({ animal, id }) => {

    const isAdmin: boolean = useSelector((state: RootState) => state.user.isAdmin);
    const userId: number | null = useSelector((state: RootState) => state.user.userId);

    return (

        (userId === animal?.user_id || isAdmin) ? (
            <div className="w-full flex-col sm:flex-row  gap-4 flex items-center justify-center p-10">
                <Link to={`/update-form/${id}`}>
                    <button className="w-60 p-10 bg-rose-500 text-white py-2 rounded-md hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400">
                        {t('adminButtons.edit')}
                    </button>
                </Link>
                <DeleteAnimalPageButton animalId={parseInt(id!, 10)} />
            </div>
        ) : null
    )
}

export default AdminButtons
