import { FaPenToSquare, FaRegTrashCan } from 'react-icons/fa6';

const SubCategoryTable = () => {
    return (
        <div className="overflow-x-auto bg-white my-3">
            <table className="table">
                {/* head */}
                <thead className='bg-green-200 text-sm'>
                    <tr>
                        <th></th>
                        <th>Category </th>
                        <th>Sub Category </th>
                        <th>Status </th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    <tr>
                        <th>1</th>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>
                            <button className='btn btn-xs btn-primary'>Status</button>
                        </td>
                        <td className="space-x-2">
                            <button className="btn btn-xs btn-circle btn-primary"><FaPenToSquare /></button>
                            <button className="btn btn-xs btn-circle btn-error"><FaRegTrashCan /></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SubCategoryTable;