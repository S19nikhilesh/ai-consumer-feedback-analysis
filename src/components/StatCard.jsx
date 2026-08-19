const StatCard = ({ title, value }) => {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <p className="text-sm text-slate-500">{title}</p>
  
        <h2 className="text-2xl font-bold text-slate-900 mt-2">
          {value}
        </h2>
      </div>
    );
  };
  
export default StatCard;