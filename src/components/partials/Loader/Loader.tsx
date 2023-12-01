import React from "react";
import "./loader.scss";

interface LoaderProps {
	style?: any,
}

const Loader: React.FC<LoaderProps> = ({style={}}) => {
    
    return (
        <div style={style} className="ax-loader">
            <div className="ax-loader-inner">
				<div className="ax-loader-spinner"></div>
                 {/* <img src="/icon-loader.svg" />  */}
            </div>
        </div>
    )
};

export default Loader;