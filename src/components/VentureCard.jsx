import { FiTrendingUp, FiUsers } from "react-icons/fi";

const VentureCard = ({ venture }) => {
  const progressPercentage = (venture.collected / venture.goal) * 100;
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Image Container */}
      <div className="relative h-48 bg-gray-100 rounded-t-lg overflow-hidden">
        <img 
          src={venture.image} 
          alt={venture.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full p-1.5">
          {venture.icon}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {venture.tags.map((tag, index) => (
            <span key={index} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        
        {/* Title and Description */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{venture.name}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{venture.description}</p>
        
        {/* Progress Section */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-900">${(venture.collected / 1000).toFixed(0)}K raised</span>
            <span className="text-xs text-gray-500">{progressPercentage.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            of ${(venture.goal / 1000).toFixed(0)}K goal
          </div>
        </div>
        
        {/* Stats Row */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <FiUsers className="w-3 h-3" />
            <span>{venture.backers} backers</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <FiTrendingUp className="w-3 h-3" />
            <span>{venture.equity}% equity</span>
          </div>
          <div className="text-xs font-medium text-blue-600">
            View Details
          </div>
        </div>
      </div>
    </div>
  );
};

export default VentureCard;