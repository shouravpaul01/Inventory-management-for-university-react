

const ReturnAccessoriesTable = ({ returnAccessories }) => {
    return (
        <div className="overflow-x-auto">
                <table className="table border-b border-violet-300">
                    {/* head */}
                    <thead className="bg-violet-200 ">
                        <tr className="text-base ">
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
                            </label>
                        </th>
                        <th>Name</th>
                        <th>OrderQty</th>
                        <th>Deadline</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        returnAccessories?.map((accessorie, index) => <tr key={index}>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
                                </label>
                            </th>
                            <td>
                                {accessorie?.name}
                            </td>
                            <td>
                                {accessorie?.orderQuantity}
                            </td>
                            <td>{accessorie?.deadline}</td>

                        </tr>)
                    }


                </tbody>
            </table>
        </div>
    );
};

export default ReturnAccessoriesTable;