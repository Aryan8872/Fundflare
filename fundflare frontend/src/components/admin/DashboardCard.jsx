const DashboardCard = ({ label, value, percent, color, icon }) => (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col items-center justify-center min-w-[180px]">
        <div className="mb-2">{icon}</div>
        <div className="relative flex items-center justify-center mb-2">
            <svg className="w-16 h-16" viewBox="0 0 36 36">
                <path
                    className="text-gray-200 dark:text-gray-700"
                    d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                />
                <path
                    className={color}
                    d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${percent}, 100`}
                />
            </svg>
            <span className="absolute text-lg font-bold">{percent}%</span>
        </div>
        <div className="text-2xl font-PoppinsBold mb-1">{value}</div>
        <div className="text-gray-500 dark:text-gray-300 font-PoppinsMedium text-sm text-center">{label}</div>
    </div>
);

export default DashboardCard; 