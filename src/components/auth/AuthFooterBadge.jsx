function AuthFooterBadge() {
  return (
    <div className="mt-6 pt-4 border-t border-gray-800/80 text-center">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-900/80 border border-gray-800 rounded-full text-[11px] text-gray-400">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Servicio preparado para API REST / JWT</span>
      </div>
    </div>
  );
}

export default AuthFooterBadge;
