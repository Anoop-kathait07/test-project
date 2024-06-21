const LocalStorageService = (function () {
  function _setToken(value: string): void {
    localStorage.setItem("access_token", value);
  }

  function _getAccessToken(): string | "" {
    const token = localStorage.getItem("access_token");
    return token || "";
  }

  function _setRole(value: string): void {
    localStorage.setItem("role", value);
  }

  function _getRole(): string | "" {
    const token = localStorage.getItem("role");
    return token || "";
  }

  function _setUserId(value: string): void {
    localStorage.setItem("userId", value);
  }

  function _getUserId(): string | "" {
    const token = localStorage.getItem("userId");
    return token || "";
  }

  function _clearToken(): void {
    localStorage.clear();
  }

  return {
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    setRole: _setRole,
    getRole: _getRole,
    setUserId: _setUserId,
    getUserId: _getUserId,
    clearToken: _clearToken,
  };
})();

export default LocalStorageService;
