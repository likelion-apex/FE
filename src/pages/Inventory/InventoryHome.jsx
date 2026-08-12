import { useOutletContext } from "react-router-dom";

import TopNavbar from "../../components/layouts/TopNavbar";

const InventoryHome = () => {
    const { setNavProps } = useOutletContext();


    return (
        <div>
            <TopNavbar stepName="인벤토리" progress={0} />
            <h1>Inventory Home</h1>
        </div>
    )
}

export default InventoryHome