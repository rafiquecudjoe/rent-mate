interface YarigaLogoProps {
  className?: string;
  iconOnly?: boolean;
}

export default function YarigaLogo({ className = '', iconOnly = false }: YarigaLogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo Icon - Stylized "Y" in a house shape */}
      <div className="w-10 h-10 bg-[#475be8] dark:bg-[#6c7ce8] rounded-lg flex items-center justify-center transition-colors relative overflow-hidden">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          {/* House roof shape forming a "Y" */}
          <path
            d="M12 3L4 9V21H9V14H15V21H20V9L12 3Z"
            fill="currentColor"
            fillOpacity="0.9"
          />
          {/* Center pillar of Y */}
          <rect
            x="10.5"
            y="11"
            width="3"
            height="6"
            fill="currentColor"
          />
        </svg>
      </div>
      
      {/* Brand Name */}
      {!iconOnly && (
        <span className="text-[22px] font-bold text-[#11142d] dark:text-[#efefef] transition-colors">
          Yariga
        </span>
      )}
    </div>
  );
}
