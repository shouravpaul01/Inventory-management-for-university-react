import julogo from '../../assets/Images/ju-logo.png'
const PrintConfirmOrder = ({printOrderData}) => {
    return (
        <div className='p-9'>
            <div className="flex  items-center border-b border-violet-600 pb-2">
                <div className='relative z-10'>
                    <div className="bg-white w-[100px] h-[100px] rounded-full">

                    </div>
                    <div className='w-24 h-24 absolute top-[2px] left-[2px] border-2 border-dotted border-violet-800 rounded-full  p-4'>
                    </div>
                    <img src={julogo} className='w-16 absolute top-3 left-5 opacity-85' alt="ju-logo" />
                </div>
                <div className="flex -ms-5 h-16 ">
                    <div className="parallelogram-clip-path w-[340px] ps-10 py-[6px] font-bold align-middle">
                        <p className="text-lg md:text-[22px] text-violet-800">Jahangirnagar University</p>
                        <p className="">Inventory Management</p>
                    </div>
                </div>
            </div>
            <div>
                {printOrderData?.userName}
            </div>
        </div>
    );
};

export default PrintConfirmOrder;