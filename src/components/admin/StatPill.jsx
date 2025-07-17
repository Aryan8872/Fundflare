const StatPill = ({ label, value, icon, color }) => (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-PoppinsMedium text-sm ${color}`}>
        <span className="text-lg">{icon}</span>
        <span>{label}</span>
        <span className="ml-auto font-bold">{value}</span>
    </div>
);

export default StatPill; 