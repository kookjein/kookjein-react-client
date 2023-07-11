import React from "react";
import { Link } from "react-router-dom";

const Legal = () => {
  return (
    <div className="w-full h-screen sm:h-screen flex flex-col items-center gradient-animation">

      <Link to="/legal/terms-of-use">
        <button className="hover:bg-white hover:text-black transition rounded-full p-1 sm:p-2 px-2 sm:px-3 mt-4">
          Terms of Service
        </button>
      </Link>
      <Link to="/legal/privacy-policy">
        <button className="hover:bg-white hover:text-black transition rounded-full p-1 sm:p-2 px-2 sm:px-3 mt-3">
          Privacy Policy
        </button>
      </Link>
      <Link to="/legal/payment-terms">
        <button className="hover:bg-white hover:text-black transition rounded-full p-1 sm:p-2 px-2 sm:px-3 mt-3">
          Payment Terms
        </button>
      </Link>
    </div>
  );
};

export default Legal;
