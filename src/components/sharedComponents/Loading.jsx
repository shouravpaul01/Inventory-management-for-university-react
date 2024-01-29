import julogo from '../../assets/Images/ju-logo.png'

const Loading = () => {
    return (
            <div className="min-h-screen flex flex-col justify-center items-center">
                <div className='relative '>
                    <div className='w-40 h-40 border-2 border-dotted border-violet-800 rounded-full animate-spin p-4'>
                    </div>
                    <img src={julogo} className='absolute top-5 left-8 animate-pulse' alt="ju-logo" />
                </div>
            </div>
    );
};

export default Loading;