// src/components/FooterNav.tsx
import React from "react";
import {
  Home,
  TicketPercent,
  ShoppingBag,
  PawPrint,
  User,
} from "lucide-react";

interface FooterNavProps {
  onGoToHome: () => void;
  onGoToCoupons: () => void;
  onGoToCart: () => void;
  onGoToPets: () => void;
  onGoToProfile: () => void;
  active?: "home" | "coupons" | "cart" | "pets" | "profile"; // 👈 tipado seguro
}

const FooterNav: React.FC<FooterNavProps> = ({
  onGoToHome,
  onGoToCoupons,
  onGoToCart,
  onGoToPets,
  onGoToProfile,
  active,
}) => {
  const baseClasses =
    "flex flex-col items-center gap-0.5 text-gray-500 hover:text-black transition px-2 py-1.5";
  const activeClasses = "text-yellow-500";

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md z-50"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom,0px))" }} // 👈 safe area iOS
    >
      <div className="flex justify-around py-1">
        <button
          onClick={onGoToHome}
          aria-current={active === "home" ? "page" : undefined}
          className={`${baseClasses} ${active === "home" ? activeClasses : ""}`}
        >
          <Home size={22} />
          <span className="text-xs leading-none">Home</span>
        </button>

        <button
          onClick={onGoToCoupons}
          aria-current={active === "coupons" ? "page" : undefined}
          className={`${baseClasses} ${active === "coupons" ? activeClasses : ""}`}
        >
          <TicketPercent size={22} />
          <span className="text-xs leading-none">Cupones</span>
        </button>

        <button
          onClick={onGoToCart}
          aria-current={active === "cart" ? "page" : undefined}
          className={`${baseClasses} ${active === "cart" ? activeClasses : ""}`}
        >
          <ShoppingBag size={22} />
          <span className="text-xs leading-none">Carrito</span>
        </button>

        <button
          onClick={onGoToPets}
          aria-current={active === "pets" ? "page" : undefined}
          className={`${baseClasses} ${active === "pets" ? activeClasses : ""}`}
        >
          <PawPrint size={22} />
          <span className="text-xs leading-none">Mascotas</span>
        </button>

        <button
          onClick={onGoToProfile}
          aria-current={active === "profile" ? "page" : undefined}
          className={`${baseClasses} ${active === "profile" ? activeClasses : ""}`}
        >
          <User size={22} />
          <span className="text-xs leading-none">Perfil</span>
        </button>
      </div>
    </nav>
  );
};

export default FooterNav;
