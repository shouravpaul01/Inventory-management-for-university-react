import { useState } from "react";
import useSelectedAccessories from "../../../hooks/useSelectedAccessories";
import { FaMinus, FaPlus } from "react-icons/fa6";
import TableBodyConfirmAccessorie from "../../../components/mainComponents/TableBodyConfirmAccessorie";


const ConfirmAccessoriesPage = () => {
    const { selectedTotalAccessories } = useSelectedAccessories()

    return (
        <section className="my-container py-16">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-violet-200">
                        <tr className="text-base">
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Return Status</th>
                            <th>Order Quantity</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                       
                            {
                                 

                                selectedTotalAccessories?.map((accessorie, index) => <TableBodyConfirmAccessorie key={index} accessorie={accessorie} />
                                )
                                
                            }

                       
                    </tbody>



                </table>
            </div>
        </section>
    );
};

export default ConfirmAccessoriesPage;